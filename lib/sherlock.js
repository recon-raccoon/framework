'use strict';

// Importing required modules
const data = require('../data/sherlock.json').data;  // Importing data from Sherlock project
const axios = require('axios');  // Importing Axios for making HTTP requests

// Function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sherlock Reimplementation
 *
 * This script is a JavaScript reimplementation of the Sherlock project using the original data
 * from the project available at https://github.com/sherlock-project/sherlock.
 *
 * It exports an asynchronous function that takes an array of usernames and probes various websites
 * to determine if the given usernames are active on those sites.
 *
 * Dependencies:
 * - data: Data from the Sherlock project containing information about websites to probe
 * - axios: Library for making HTTP requests
 *
 * Functionality:
 * - Iterates through each provided username
 * - For each username, probes various websites using the data from the Sherlock project
 * - Introduces a delay before making each HTTP request to avoid rate limiting
 * - Resolves with an array of results indicating the activity status of each username on different websites
 *
 * Note: The script utilizes asynchronous programming with Promises to handle HTTP requests concurrently.
 */
module.exports = async (usernames = []) => {
    const results = [];  // Array to store results for each username

    // Ensure usernames is an array
    if (!Array.isArray(usernames)) {
        usernames = [usernames];
    }

    // If no usernames provided, return an empty array
    if (usernames.length === 0) {
        return [];
    }

    // Loop through each username
    for (const username of usernames) {
        const usernameResults = [];  // Array to store results for each website

        // Loop through each website in the Sherlock data
        for (const website of Object.values(data)) {
            // Check if the website has a regex check
            if (website.regexCheck) {
                const regexCheck = new RegExp(website.regexCheck);
                // If username doesn't match the regex, skip to the next website
                if (!regexCheck.test(username)) {
                    continue;
                }
            }

            // Construct the URL to probe based on the website's configuration
            const url = website.urlProbe ? website.urlProbe.replace('{}', username) : website.url.replace('{}', username);

            // Introduce a delay before making the HTTP request
            await delay(100);

            // Push a promise to the usernameResults array for asynchronous handling
            usernameResults.push(
                new Promise(async (resolve) => {
                    try {
                        // Make an HTTP GET request to the constructed URL
                        const response = await axios({
                            method: 'GET',
                            url: url,
                            timeout: 5000,
                        });

                        let active = true;  // Flag to indicate if the username is active on this website

                        // Convert response data to a string if it's not already
                        if (typeof response.data !== 'string') {
                            response.data = JSON.stringify(response.data);
                        }

                        // Check for errors based on the website's configuration
                        if (website.errorType === 'message' && website.errorMsg) {
                            if (response.data.includes(website.errorMsg)) {
                                active = false;  // If error message is found, set active to false
                            }
                        }

                        if (website.errorType === 'response_url' && website.errorUrl) {
                            if (response.request.res.responseUrl.includes(website.errorUrl.replace('{}', username))) {
                                active = false;  // If error URL is found, set active to false
                            }
                        }

                        if (website.errorType === 'status_code') {
                            if (response.status !== 200) {
                                active = false;  // If non-200 status code, set active to false
                            }
                        }

                        // Resolve the promise with the result for this username and website
                        resolve({
                            username,
                            url,
                            urlMain: website.urlMain,
                            active,
                        });
                    } catch (error) {
                        // If an error occurs during the HTTP request, resolve with an inactive result
                        resolve({ username, url, urlMain: website.urlMain, active: false });
                    }
                })
            );
        }

        // Push a promise to the results array for asynchronous handling
        results.push(Promise.all(usernameResults));
    }

    // Resolve the main promise with all results for all usernames and websites
    return Promise.all(results.flat());
};
