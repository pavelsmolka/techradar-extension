export default function ajax(url, { method, headers, data} = { method: "GET", headers : new Map() }) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                resolve(request.responseText);
            } else {
                reject(new Error("Failure"));
            }
        };

        for (let [name, val] of headers) {
            request.setRequestHeader(name, val);
        }

        request.onerror = function () { reject(new Error("Failure")); };
        request.send(data && JSON.stringify(data));
    })
}