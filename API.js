const backendURL = "myhome-backend.vercel.app/api/v1/"

export async function contactBackend(endpoint, accessRequired = false, method = "GET", queryParams = null, body = null, secure = false, expectedResponseCode = 200) {

    try {

        let urlString = (secure ? "https://" : "http://") +
            (backendURL) +
            (endpoint) +
            (queryParams ? "?" + new URLSearchParams(queryParams) : "")

        let optionsObj = {
            method: method
        }

        if (accessRequired) {
            optionsObj["headers"] = {};
            optionsObj.headers["x-access-token"] = localStorage.getItem('token')
        };

        if (body) {
            {
                optionsObj["headers"] = {};
                optionsObj["body"] = JSON.stringify(body);
                optionsObj.headers["Content-Type"] = "application/json";
            }
        };

        console.log(optionsObj)

        let requestResponse = await fetch(urlString, optionsObj);

        if (requestResponse.status != expectedResponseCode) throw Error("Respuesta de backend no esperada");

        requestResponse = await requestResponse.json();

        return requestResponse;

    } catch (e) {

        console.log(e);
        throw Error("Solicitud fallida")

    }

}