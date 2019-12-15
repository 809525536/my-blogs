export const state = () => ({
  info: {}
})

export const mutations = {
  userInfo (state, info) {
    state.info = info
  }
}