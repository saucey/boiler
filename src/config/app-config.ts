require('dotenv').config();

const config = require(`../app-config/app-config-${process.env.REACT_APP_ENV}`).default;

const appConfig = {
    endPoints: config.endPoints
}

export default appConfig;