import axios from "axios";

// https://axios-http.com/docs/instance

const baseUrl = process.env.BASE_URL

const httpServer = axios.create({
        baseURL: '/api/',
    });

export default httpServer

