/**
 * 获取localStorage中指定key的项
 * 
 * @param {String} key 
 * @returns 
 */
export function getLSItem(key) {
    return localStorage.getItem(key);
}

/**
 * 保存key-value到localStorage
 * 
 * @param {String} key 
 * @param {Object} value 
 */
export function saveLSItem(key, value) {
    if (typeof value === "object") {
        value = JSON.stringify(value); // 将对象转换为字符串
    }
    localStorage.setItem(key, value); // 保存键值对到 localStorage
}

/**
 * 从localStorage中移除指定key的项
 * @param {String} key 
 */
export function removeLSItem(key) {
    localStorage.removeItem(key);
}

/**
 * 删除本地存储中的所有数据
 */
export function removeLS() {
    localStorage.clear();
}