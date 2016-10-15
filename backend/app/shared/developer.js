const config = require('../../config/app.json');

module.exports = {
  prepareDevResponse(error) {
      if (!config.developer_mode) {
          delete error.dev_error;
      }
  }  
};