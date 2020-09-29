const axios = require('axios');

async function getRequest({ url ,params }) {
  try {
    const response = await axios({
      url,
      params,
      method: 'GET',
    });

    return response;
  } catch (error) {
    return { error };
  }
}

module.exports = {
  getRequest,
};
