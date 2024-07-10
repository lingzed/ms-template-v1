import request from "@/utils/HTTP/index"

const baseURL = "goods"

export function select() {
    return request.get(baseURL, {
        headers: {
            Permission: "VIEW"
        }
    });
}

export function edit() {
    return request.put(baseURL, {}, {
        headers: {
            Permission: "EDIT"
        }
    });
}