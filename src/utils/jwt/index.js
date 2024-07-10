/**
 * 解析JWT字符串payload部分
 * 
 * @param {String} token jwt字符串
 * @returns 解析后的对象
 */
export function parseJwt(token) {
    // 分割JWT的三个部分
    const parts = token.split('.');
    // 解码JWT的payload部分
    const payload = decodeBase64Url(parts[1]);
    // 将解码后的payload转换为对象
    return JSON.parse(payload);
}

/**
 * 解码 Base64 字符串
 * 
 * @param {string} input 
 * @returns 
 */
function decodeBase64Url(input) {
    try {
        let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        // Padding the base64 string with '=' characters if necessary
        switch (base64.length % 4) {
            case 0:
                break;
            case 2:
                base64 += '==';
                break;
            case 3:
                base64 += '=';
                break;
            default:
                throw new Error('Invalid base64 string'); // 使用 Error 对象
        }

        // 使用 window.atob 解码 Base64 字符串
        const decoded = window.atob(base64);

        // 将解码后的二进制字符串直接转换为 Uint8Array
        const decodedArray = new Uint8Array(
            Array.from(decoded, c => c.charCodeAt(0)) // 将字符串转换为字符编码数组
        );

        // 将 Uint8Array 解码为 UTF-8 字符串（但这里通常不需要，因为 atob 已经返回 UTF-8 字符串）
        const textDecoder = new TextDecoder('utf-8');
        return textDecoder.decode(decodedArray); // 但实际上返回 decoded 就足够了
    } catch (e) {
        console.error('Failed to decode base64 string:', e);
        throw e; // 可以直接抛出捕获到的错误对象，或者封装为新的 Error 对象
    }
}

