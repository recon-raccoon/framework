'use strict';

/**
 * Data and HTTP Client Initialization
 *
 * This code initializes the 'data' variable by requiring the 'sherlock.json' file
 * from the '../data/' directory. Additionally, it imports the 'axios' and 'iconv-lite'
 * modules for making HTTP requests and handling character encoding, respectively.
 *
 * @constant {object} data - Parsed content of 'sherlock.json'
 * @requires axios
 * @requires iconv-lite
 */
const data = require('../data/sherlock.json').data;
const axios = require('axios');
const iconv = require('iconv-lite');

/**
 * Asynchronous Delay Function
 *
 * This code defines an asynchronous delay function using Promises.
 * It allows for introducing a delay in code execution for a specified duration.
 *
 * @function delay
 * @param {number} ms - The duration of the delay in milliseconds.
 * @returns {Promise} A Promise that resolves after the specified delay.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * User Agent Array Initialization
 *
 * This code initializes an array containing multiple user-agent strings.
 * These user-agent strings represent different web browsers and versions.
 * The array is commonly used for simulating various user agents in HTTP requests.
 *
 * @constant {string[]} ua - Array of user-agent strings
 */
const ua = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
];

/**
 * Sherlock.js Remake for Node.js
 *
 * This module exports an asynchronous function that checks the existence
 * of usernames on various websites. It uses a Sherlock.js remake for Node.js.
 * The function takes an array of usernames and an optional verbose flag as parameters.
 *
 * @module Sherlock.js Remake
 * @param {Array|string} usernames - An array of usernames or a single username.
 * @param {boolean} [verbose=false] - An optional flag to enable verbose logging.
 * @returns {Promise<Array>} - A promise that resolves to an array of results for each username.
 */
module.exports = async (usernames = [], verbose = false) => {
    const results = [];

    /**
     * Ensure usernames is an Array
     *
     * This code checks if the variable 'usernames' is an array. If not, it converts it to an array.
     * 
     * @param {(string|string[])} usernames - The variable to be checked or converted to an array.
     * @returns {Array} An array containing the usernames.
     */
    if (!Array.isArray(usernames)) {
        usernames = [usernames];
    }

    /**
     * Empty Usernames Check
     *
     * This code checks if an array of usernames is empty. If no usernames are provided,
     * it returns an empty array.
     *
     * @param {Array} usernames - An array containing usernames to be checked.
     * @returns {Array} - An empty array if no usernames are provided.
     */
    if (usernames.length === 0) {
        return [];
    }

    /**
     * Username Probing Logic
     *
     * This section of code iterates through a list of usernames, probes various websites for the existence
     * of each username, and collects the results asynchronously. It utilizes the 'axios' library for making
     * HTTP requests, 'iconv' for handling character encoding, and a custom 'delay' function for introducing
     * delays between requests.
     *
     * @param {Array} usernames - Array of usernames to probe
     * @param {Object} data - Sherlock data containing configuration for different websites
     * @param {boolean} verbose - Flag for enabling verbose logging
     * @returns {Array} An array of promises, each resolving to an array of results for each username and website
     */
    for (const username of usernames) {
        const usernameResults = [];  // Array to store results for each website

        /**
         * Website Username Probe
         *
         * This code iterates over a collection of websites, performs username probing,
         * and checks for specific conditions based on the website's configuration.
         *
         * @param {Object} data - Collection of websites and their configurations
         * @param {string} username - Username to probe across websites
         * @param {boolean} verbose - Whether to log detailed information
         * @returns {Array<Promise>} - Array of promises representing the results of username probing
         */
        for (const website of Object.values(data)) {
            
            /**
             * Username Validation
             *
             * This code checks if the provided 'username' satisfies a regular expression
             * condition specified by 'website.regexCheck'. If the regular expression check
             * fails, the loop continues to the next iteration, skipping further processing.
             *
             * @param {Object} website - The website object containing configuration details.
             * @param {string} website.regexCheck - The regular expression pattern for username validation.
             * @param {string} username - The username to be validated.
             */
            if (website.regexCheck) {
                const regexCheck = new RegExp(website.regexCheck);
                if (!regexCheck.test(username)) {
                    continue;
                }
            }

            /**
             * URL Construction for Probing
             *
             * This code constructs a URL for probing based on the website's configuration. It utilizes
             * the `urlProbe` property if available; otherwise, it falls back to the standard `url` property.
             *
             * @const {string} url - The constructed URL for probing.
             * @type {string}
             */
            const url = website.urlProbe ? website.urlProbe.replace('{}', username) : website.url.replace('{}', username);

            /**
             * Introduce Delay Before HTTP Request
             *
             * This code adds a delay of 50 milliseconds before making an HTTP request.
             * It utilizes the 'await' keyword to asynchronously introduce the delay.
             *
             * @function delay
             * @param {number} milliseconds - The duration of the delay in milliseconds.
             * @returns {Promise} - A Promise representing the completion of the delay.
             */
            await delay(50);

            /**
             * Asynchronous HTTP Requests for Usernames
             *
             * This code initiates asynchronous HTTP GET requests for usernames using Axios.
             * It pushes a promise to the 'usernameResults' array for asynchronous handling.
             * The requests are made to the constructed URL, with a timeout of 5000 milliseconds and
             * a rotating user agent from the 'ua' array in the headers.
             *
             * @module axios
             * @param {string} url - The constructed URL for the HTTP GET request.
             * @param {string} ua - A randomly selected user agent from the 'ua' array.
             * @param {boolean} verbose - A flag indicating whether to log verbose information.
             * @param {object} website - Configuration object for the website being checked.
             * @param {string} username - The username for which the HTTP request is made.
             * @param {array} usernameResults - An array to store promises for asynchronous handling.
             * @returns {Promise} - A promise resolving with an object containing information about
             * the username's activity on the website, such as its status and URL details.
             */
            usernameResults.push(
                new Promise((resolve) => {
                    try {

                        let responseData = {response: {}, body: ''};

                        /**
                         * HTTP GET Request using Axios
                         *
                         * This code makes an HTTP GET request using the Axios library to the specified URL.
                         * It includes configuration options such as method, URL, timeout, responseType, and headers.
                         * The 'User-Agent' header is set to a randomly selected user agent from the 'ua' array.
                         *
                         * @async
                         * @function
                         * @param {string} url - The URL to which the GET request is made.
                         * @returns {Promise} A promise that resolves with the response data or rejects with an error.
                         */
                        axios({
                            method: 'get',
                            url,
                            timeout: 10000,
                            responseType: 'arraybuffer',
                            headers: {
                                'Accept': website.json ? 'application/json' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                                'User-Agent': ua[Math.floor(Math.random()*ua.length)]
                            }
                        }).then((response) => {

                            let body = iconv.decode(response.data, 'utf-8');

                            /**
                             * Content-Type Charset Handling
                             *
                             * This code checks if the 'content-type' header is present in the response headers.
                             * If present, it extracts the charset value from the 'content-type' header.
                             * Then, it decodes the response data using the identified charset value (if available).
                             *
                             * @param {Object} response - The HTTP response object.
                             * @property {Object} headers - The headers of the HTTP response.
                             * @property {Buffer} data - The data received in the HTTP response.
                             * @returns {string|null} body - The decoded response body with the identified charset, or null if no charset is found.
                             */
                            if ('content-type' in response.headers) {
                                const parts = response.headers['content-type'].split(';');
                                const charsetPart = parts.find(part => part.includes('charset='));
                                const charsetValue = charsetPart ? charsetPart.split('=')[1].trim() : null;

                                if (charsetValue) {
                                    body = iconv.decode(response.data, charsetValue);
                                }
                            }

                            /**
                             * JSON Body Stringification
                             *
                             * If the 'content-type' header in the HTTP response includes 'application/json',
                             * this block of code stringifies the 'body' to ensure it is in JSON format.
                             *
                             * @condition
                             * @param {Object} response - HTTP response object
                             */
                            if (response.headers['content-type'].includes('application/json')) {
                                body = JSON.stringify(JSON.parse(body));
                            }

                            responseData = {response, body};
                        }).catch((error) => {

                            const response = error.response;
                            
                            /**
                             * Undefined Response Check
                             *
                             * This code checks if the 'response' variable is undefined. If it is, it initializes
                             * 'responseData' with an empty response object and an empty body string, and then exits
                             * the current function or block.
                             */
                            if (response === undefined) {
                                return;
                            }

                            /**
                             * Text Decoding Operation
                             *
                             * This code decodes the response data using the 'utf-8' encoding through the 'iconv' module.
                             * It assumes that 'response.data' contains binary data and decodes it into a UTF-8 encoded string.
                             *
                             * @constant {string} iconv - The 'iconv' module for character encoding conversion.
                             * @type {string}
                             * @param {Buffer} response.data - Binary data to be decoded.
                             * @returns {string} body - The UTF-8 decoded string.
                             */
                            let body = iconv.decode(response.data, 'utf-8');

                            /**
                             * Content-Type Charset Handling
                             *
                             * This code checks if the 'content-type' header is present in the response headers.
                             * If present, it extracts the charset value from the 'content-type' header.
                             * Then, it decodes the response data using the identified charset value (if available).
                             *
                             * @param {Object} response - The HTTP response object.
                             * @property {Object} headers - The headers of the HTTP response.
                             * @property {Buffer} data - The data received in the HTTP response.
                             * @returns {string|null} body - The decoded response body with the identified charset, or null if no charset is found.
                             */
                            if ('content-type' in response.headers) {
                                const parts = response.headers['content-type'].split(';');
                                const charsetPart = parts.find(part => part.includes('charset='));
                                const charsetValue = charsetPart ? charsetPart.split('=')[1].trim() : null;

                                if (charsetValue) {
                                    body = iconv.decode(response.data, charsetValue);
                                }
                            }

                            /**
                             * JSON Body Stringification
                             *
                             * If the 'content-type' header in the HTTP response includes 'application/json',
                             * this block of code stringifies the 'body' to ensure it is in JSON format.
                             *
                             * @condition
                             * @param {Object} response - HTTP response object
                             */
                            if ('content-type' in response.headers) {
                                if (response.headers['content-type'].includes('application/json')) {
                                    body = JSON.stringify(JSON.parse(body));
                                }
                            }

                            responseData = {response: error.response || {}, body};
                        }).finally(() => {

                            const {response, body} = responseData;
                            let active = true;

                            /**
                             * Response Handling
                             *
                             * This code block checks if the response object is empty or if the body is an empty string.
                             * If either condition is true, the function resolves with an object containing information
                             * about the username, URL, main URL, and an 'active' status set to false.
                             *
                             * @param {Object} response - The response object
                             * @param {string} body - The response body
                             * @returns {Promise} A Promise that resolves to an object with username, URL, main URL, and active status
                             */
                            if (Object.keys(response).length === 0 || body === '') {
                                return resolve({
                                    username,
                                    url,
                                    urlMain: website.urlMain,
                                    active: false,
                                });
                            }

                            /**
                             * Check Website Status
                             *
                             * This code checks the status of a website based on the provided response and the 'ignoreStatus' property.
                             * If 'ignoreStatus' is not set, it evaluates the HTTP status code, and if it starts with '4' or '5', it sets 'active' to false.
                             *
                             * @param {Object} website - The website object containing status-related properties.
                             * @param {boolean} website.ignoreStatus - Indicates whether to ignore the HTTP status code.
                             * @param {Object} response - The HTTP response object from a request.
                             * @param {number} response.status - The HTTP status code of the response.
                             * @param {boolean} active - The variable indicating the active status of the website.
                             */
                            if (!website.ignoreStatus) {
                                if (response.status.toString().startsWith(4) || response.status.toString().startsWith(5)) {
                                    active = false;
                                }
                            }

                            /**
                             * Error Checking Based on Website Configuration
                             *
                             * This code checks for errors on a website based on the provided configuration.
                             * If the website's error type is set to 'message' and an error message is specified,
                             * it verifies whether the webpage body includes the configured error message. If the
                             * error message is found, the 'active' variable is set to false.
                             *
                             * @param {string} website.errorType - Type of error checking configured for the website.
                             * @param {string} website.errorMsg - Configured error message to check against the webpage body.
                             * @param {string} body - The body of the webpage.
                             * @param {boolean} active - Variable indicating the active status based on error checking.
                             */
                            if (website.errorType === 'message' && website.errorMsg) {
                                if (body.includes(website.errorMsg)) {
                                    active = false;
                                }
                            }

                            /**
                             * Error Handling Condition
                             *
                             * This code checks for specific conditions related to error handling.
                             * If 'active' is true, the 'errorType' is 'response_url', and 'errorUrl' is defined,
                             * it further checks if the response URL includes the dynamically generated error URL
                             * (by replacing '{}' with the 'username'). If true, it sets 'active' to false.
                             *
                             * @type {boolean} active - Flag indicating the active state.
                             * @type {string} website.errorType - Type of error, expected to be 'response_url'.
                             * @type {string} website.errorUrl - The error URL template with a placeholder '{}'.
                             * @type {string} response.request.res.responseUrl - Response URL from the HTTP request.
                             * @type {string} username - Placeholder to be replaced in the error URL.
                             */
                            if (active && website.errorType === 'response_url' && website.errorUrl) {
                                if (response.request.res.responseUrl.includes(website.errorUrl.replace('{}', username))) {
                                    active = false;
                                }
                            }

                            /**
                             * Console Log Activation Status
                             *
                             * This code logs the activation status of a website to the console if both
                             * 'verbose' and 'active' variables are truthy.
                             *
                             * @param {boolean} verbose - A boolean indicating whether to display detailed logs.
                             * @param {boolean} active - A boolean indicating the activation status of the website.
                             * @param {string} website.urlMain - The main URL of the website.
                             * @param {string} url - The URL associated with the activation status.
                             */
                            if (verbose && active) console.log(`[+] ${website.urlMain} is active! (${url})`);

                            /**
                             * Resolve User Information
                             *
                             * Resolves and returns user information with the provided parameters.
                             *
                             * @function
                             * @param {string} username - The username of the user.
                             * @param {string} url - The URL associated with the user.
                             * @param {string} urlMain - The main URL of the website.
                             * @param {boolean} active - Indicates whether the user is active.
                             * @returns {Object} - An object containing resolved user information.
                             */
                            return resolve({
                                username,
                                url,
                                urlMain: website.urlMain,
                                active,
                            });

                        });
                    } catch (error) {
                        return resolve({ username, url, urlMain: website.urlMain, active: false });
                    }
                })
            );
        }

        /**
         * Asynchronous Handling for Username Results
         *
         * This code pushes a promise to the 'results' array to handle asynchronous operations
         * for username results. It utilizes the 'Promise.all' method to wait for all promises
         * in the 'usernameResults' array to settle.
         *
         * @method Promise.all
         * @param {Array<Promise>} usernameResults - An array of promises for username results.
         * @returns {Promise<Array>} - A promise that resolves to an array of settled values.
         */
        results.push(Promise.all(usernameResults));
    }

    /**
     * Asynchronous Promise Handling
     *
     * This code uses the Promise.all() method to handle an array of promises returned
     * by the 'results' array. The Promise.all() method returns a single Promise that
     * resolves when all of the promises in the array resolve, or rejects if any of
     * the promises reject. The 'flat()' method is used to flatten the nested arrays
     * before passing them to Promise.all().
     *
     * @function
     * @param {Array<Array<Promise>>} results - An array of arrays containing promises.
     * @returns {Promise<Array>} A promise that resolves to an array of results.
     */
    return Promise.all(results.flat());
};
