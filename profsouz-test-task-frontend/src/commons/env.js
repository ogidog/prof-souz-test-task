export const API_SERVER_URI = process.env.VUE_APP_SERVER_PROTOCOL + "://" + (process.env.NODE_ENV === "production" ?
    process.env.VUE_APP_WEB_SERVER_HOST + ":" + process.env.VUE_APP_WEB_SERVER_PORT :
    process.env.VUE_APP_API_SERVER_HOST + ":" + process.env.VUE_APP_API_SERVER_PORT);