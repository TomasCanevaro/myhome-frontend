const backendURL = "myhome-backend.vercel.app/api/v1/"

export async function contactBackend(endpoint, accessRequired = false, method = "GET", queryParams = null, body = null, secure = false, expectedResponseCode = 200) {

    try {
        let urlString = (secure ? "https://" : "http://") +
            backendURL +
            endpoint +
            (queryParams ? "?" + new URLSearchParams(queryParams).toString() : "")

        let optionsObj = {
            method: method,
            headers: {}
        }

        if (accessRequired) {
            const token = localStorage.getItem('token');
            if (token) {
                optionsObj.headers["Authorization"] = `Bearer ${token}`;
            } else {
                throw new Error('Access token is required but was not found.');
            }
        }

        if (body) {
            if (!optionsObj.headers) {
                optionsObj.headers = {};
            }
            optionsObj.body = JSON.stringify(body);
            optionsObj.headers["Content-Type"] = "application/json";
        }

        console.log(optionsObj);

        let requestResponse = await fetch(urlString, optionsObj);

        if (requestResponse.status !== expectedResponseCode) {
            throw new Error("Respuesta de backend no esperada");
        }

        requestResponse = await requestResponse.json();

        return requestResponse;

    } catch (e) {

        console.log(e);
        throw new Error("Solicitud fallida")

    }
}
