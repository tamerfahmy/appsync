/* Writes a debug message on console
 * @param {debug message} message 
 */

const DEBUG = process.env.DEBUG || 'false';

module.exports = (message, ...optionalParams) => {
    if (DEBUG == 'true') {
        if (optionalParams && optionalParams.length > 0) console.log(`DEBUG: ${message}`, optionalParams);
        else console.log(`DEBUG: ${message}`);
    }
};