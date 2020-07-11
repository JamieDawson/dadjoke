// jshint esversion: 9

/**
 * @description null
 * @param {ParamsType} params list of command parameters
 * @param {?string} commandText text message
 * @param {!object} [secrets = {}] list of secrets
 * @return {Promise<SlackBodyType>} Response body
 */

const dadJokeLink = "https://icanhazdadjoke.com/slack";

async function _command(params, commandText, secrets = {}) {
  const axios = require('axios');
  let response;
  
  try {
    const url = `${dadJokeLink}`;
    response = await axios.get(url);
  }catch(err){
    return null;
  }

  return {
    response_type: 'in_channel', // or `ephemeral` for private response
    text: response.data.attachments[0].fallback
  };
}

/**
 * @typedef {object} SlackBodyType
 * @property {string} text
 * @property {'in_channel'|'ephemeral'} [response_type]
 */

const main = async (args) => ({
  body: await _command(args.params, args.commandText, args.__secrets || {}).catch(error => ({
    // To get more info, run `/nc activation_log` after your command executes
    response_type: 'ephemeral',
    text: `Error: ${error.message}`
  }))
});
module.exports = main;
