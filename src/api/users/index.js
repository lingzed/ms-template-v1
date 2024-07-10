import request from "@/utils/HTTP/index"

const baseURL = "user"

export function select() {
    return request.get(baseURL, {
        headers: {
            Permission: "VIEW"
        }
    });
}