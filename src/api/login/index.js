import request from "@/utils/HTTP/index.js"

const baseURL = "/login"

export function login(user) {
    return request.post(baseURL, user, {
        headers: {
            Permission: "login"
        }
    })
}