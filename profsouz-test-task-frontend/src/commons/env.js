
export const appConfig = {
    BAR_WIDTH: 50,
    BAR_GAP: 2,
    BARS_CONTAINER_MARGIN_X: 20,
    BARS_CONTAINER_MARGIN_Y: 20,

    MIN_VALUE: -200,
    MAX_VALUE: 550,

    API_SERVER_URI: process.env.VUE_APP_API_SERVER_PROTOCOL + "://" + (process.env.NODE_ENV === "production" ?
        process.env.VUE_APP_WEB_SERVER_HOST + ":" + process.env.VUE_APP_WEB_SERVER_PORT :
        process.env.VUE_APP_API_SERVER_HOST + ":" + process.env.VUE_APP_API_SERVER_PORT)
}
