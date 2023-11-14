/**
 * Module Exports
 *
 * @module Object
 * @property {Object} username - Module for username seeking.
 * @property {Object} review - Module for review tracing.
 * @property {Object} socialMedia - Module for social media harvesting.
 * @property {Object} linguisticProfiller - Module for linguistic profiling.
 * @property {Object} blockchain - Module for blockchain linking.
 */
module.exports = {
    username: require('./modules/UsernameSeeker'),
    review: require('./modules/ReviewTracer'),
    socialMedia: require('./modules/SocialHarvester'),
    linguisticProfiller: require('./modules/LinguisticProfiller'),
    blockchain: require('./modules/BlockchainLinker')
};