import axios from "axios"
import history from "./history"

class server {

    constructor (){
        this.baseurl = process.env.REACT_APP_BACKEND_SERVER
    }

    async get(uri, config) {
        try {
            const response = await axios({
                method: "GET",
                url: this.baseurl + uri,
                withCredentials: true,
                ...config
            });
            return response.data;
        } catch (e) {
            server.handleError(e)
        }
    }

    async post(uri, body, config) {
        try {
            const response = await axios({
                method: "POST",
                url: this.baseurl + uri,
                data: body,
                withCredentials: true,
                ...config
            });
            return response.data;
        } catch (e) {
            server.handleError(e)
        }
    }

    async put(uri, body, config) {
        try {
            const response = await axios({
                method: "PUT",
                url: this.baseurl + uri,
                data: body,
                withCredentials: true,
                ...config
            });
            return response.data;
        } catch (e) {
            server.handleError(e)
        }
    }

    static handleError(err) {
        if (err.response && err.response.status === 401) {
            history.push("/login")
        }
    }
}

const instance = new server();
Object.freeze(instance);

export default instance
