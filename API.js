const backendURL = "myhome-backend.vercel.app/api/v1/"

export async function contactBackend(endpoint, accessRequired = false, method = "GET", queryParams = null, body = null, secure = false, expectedResponseCode = 200, token = null) {

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
            if (token) {
                optionsObj.headers["authorization"] = `${token}`;
                console.log("Authorization Header:", optionsObj.headers["authorization"]);
              }
        }

        if (body) {
            {
                optionsObj["body"] = JSON.stringify(body);
                optionsObj.headers["Content-Type"] = "application/json";
                optionsObj.headers["accept"] = "application/json";
            }
            optionsObj.body = JSON.stringify(body);
            optionsObj.headers["Content-Type"] = "application/json";
        }

        console.log(optionsObj);

        let requestResponse = await fetch(urlString, optionsObj);

        console.log("requestResponse:", JSON.stringify(requestResponse, null, 2)); // Log the response object as a JSON string

        if (requestResponse.status != expectedResponseCode) throw Error("Respuesta de backend no esperada");

        requestResponse = await requestResponse.json();

        return requestResponse;

    } catch (e) {

        console.log(e);
        throw new Error("Solicitud fallida")

    }
}
