import { saveLSItem, getLSItem } from '@/utils/localstorage';
import { parseJwt } from '@/utils/jwt/index';
import { createStore } from 'vuex'

// 初始化数据，从本地存储中获取数据，如果没有则使用默认值
const initData = (key, parse, defaultData) => {
  try {
    const dataStr = getLSItem(key);
    return dataStr ? parse(dataStr) : defaultData;
  } catch (error) {
    console.log(error);
    return defaultData;
  }
}

export default createStore({
  state: {
    rightList: initData("rights", (data) => JSON.parse(data), []), // 权限数组，从本地获取，如果没有则为空数组
    userinfo: initData("token", (data) => parseJwt(data), {}) // 用户信息，从本地获取，如果没有则为空对象
  },
  getters: {
  },
  mutations: {
    setRightList(state, data) {
      state.rightList = data; // 更新state中的rightList
      saveLSItem('rights', data); // 更新本地存储中的rights
    },
    setUserinfo(state, data) {
      state.userinfo = parseJwt(data); // 更新state中的userinfo
      saveLSItem("token", data); // 更新本地存储中的userinfo
    }
  },
  actions: {
  },
  modules: {
  }
})
