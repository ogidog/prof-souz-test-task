export const appConfig = {
    API_SERVER_PROTOCOL: "http",
    API_SERVER_HOST: "api-service.pfsz.local",
    API_SERVER_PORT: "3001",
    WEB_SERVER_HOST: "localhost",
    WEB_SERVER_PORT: "8080",

    RANDOM_NUMBER_API_URL: function () {
        return this.API_SERVER_PROTOCOL + "://" + (process.env.NODE_ENV === "production" ?
            this.WEB_SERVER_HOST + ":" + this.WEB_SERVER_PORT :
            this.API_SERVER_HOST + ":" + this.API_SERVER_PORT) + "/api/random-number"
    },

    BAR_WIDTH: 50,
    BAR_GAP: 2,
    BARS_CONTAINER_MARGIN_X: 20,
    BARS_CONTAINER_MARGIN_Y: 20,

    MIN_VALUE: -200,
    MAX_VALUE: 550,
}
