export const state = () => ({
  info: {}
})

export const mutations = {
  userInfo(state, info) {
    state.info = info
  }
}

export const actions = {
  setUserInfo({
    state,
    commit
  }, val) {
    commit('userInfo', val)
  }
}
