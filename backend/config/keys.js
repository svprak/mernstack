require('dotenv').config();

const localServer = process.env.LOCAL_HOST_SERVER_DB;

module.exports = {
  MongoURI: localServer,
};
