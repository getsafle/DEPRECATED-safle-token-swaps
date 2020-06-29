const axios = require('axios');

async function getRequest({ url }) {
    try {
      const response = await axios({
        url,
        method: 'GET',
      });
      
      return response;
    } catch (error) {
      return { error };
    }
}
  
module.exports = {
    getRequest,
}