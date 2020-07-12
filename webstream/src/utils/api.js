import streams from "./streams";

export function fetchStream(id) {
    return new Promise((resolve, reject) => {
        streams
            .get("/streams/" + id)
            .then((res) => {
                return resolve(res.data);
            })
            .catch((error) => reject(error));
    });
}
