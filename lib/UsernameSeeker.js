'use strict';

// Importing required modules
const data = require('../data/sherlock.json').data;  // Importing data from Sherlock project
const axios = require('axios');  // Importing Axios for making HTTP requests
const iconv = require('iconv-lite');

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
module.exports = async (usernames = [], verbose = false) => {
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
                new Promise((resolve) => {
                    try {
                        // Make an HTTP GET request to the constructed URL
                        axios({
                            method: 'GET',
                            url: url,
                            timeout: 5000,
                            responseType: 'arraybuffer',
                            Headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
                            }
                        }).then((response) => {

                            let body = iconv.decode(response.data, 'utf-8');
                            let active = true; 

                            if ('content-type' in response.headers) {
                                const parts = response.headers['content-type'].split(';');
                                const charsetPart = parts.find(part => part.includes('charset='));
                                const charsetValue = charsetPart ? charsetPart.split('=')[1].trim() : null;

                                if (charsetValue) {
                                    body = iconv.decode(response.data, charsetValue);
                                }
                            }

                            // Convert response data to a string if it's not already
                            if (typeof body !== 'string') {
                                body = JSON.stringify(body);
                            }

                            // Check for errors based on the website's configuration
                            if (website.errorType === 'message' && website.errorMsg) {
                                if (body.includes(website.errorMsg)) {
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

                            if (verbose && active) console.log(`[+] ${website.urlMain} is active! (${url})`);

                            // Resolve the promise with the result for this username and website
                            resolve({
                                username,
                                url,
                                urlMain: website.urlMain,
                                active,
                            });
                        }).catch(() => {
                            // If an error occurs during the HTTP request, resolve with an inactive result
                            resolve({ username, url, urlMain: website.urlMain, active: false });
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
