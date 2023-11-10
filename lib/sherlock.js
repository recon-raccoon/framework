// Js reimplmentation of the sherlock project using the original data from the project
// https://github.com/sherlock-project/sherlock

const data = require('../data/sherlock.json').data;
const axios = require('axios');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = async (usernames = []) => {
    const results = [];

    if (!Array.isArray(usernames)) {
        usernames = [usernames];
    }

    if (usernames.length === 0) {
        return [];
    }

    for (const username of usernames) {
        const usernameResults = [];

        for (const website of Object.values(data)) {
            if (website.regexCheck) {
                const regexCheck = new RegExp(website.regexCheck);
                if (!regexCheck.test(username)) {
                    continue;
                }
            }

            const url = website.urlProbe ? website.urlProbe.replace('{}', username) : website.url.replace('{}', username);

            await delay(100);

            usernameResults.push(
                new Promise(async (resolve) => {
                    try {
                        const response = await axios({
                            method: 'GET',
                            url: url,
                            timeout: 5000,
                        });

                        let active = true;

                        if (typeof response.data !== 'string') {
                            response.data = JSON.stringify(response.data);
                        }

                        if (website.errorType === 'message' && website.errorMsg) {
                            if (response.data.includes(website.errorMsg)) {
                                active = false;
                            }
                        }

                        if (website.errorType === 'response_url' && website.errorUrl) {
                            if (response.request.res.responseUrl.includes(website.errorUrl.replace('{}', username))) {
                                active = false;
                            }
                        }

                        if (website.errorType === 'status_code') {
                            if (response.status !== 200) {
                                active = false;
                            }
                        }

                        resolve({
                            username,
                            url,
                            urlMain: website.urlMain,
                            active,
                        });
                    } catch (error) {
                        resolve({ username, url, urlMain: website.urlMain, active: false });
                    }
                })
            );
        }

        results.push(Promise.all(usernameResults));
    }

    return Promise.all(results.flat());
};
