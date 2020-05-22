const actions = {
  addBook({ commit }, data) {
    commit('addBook', data);
  },
  clearCart({ commit }) {
    commit('clearCart');
  },
};

export default actions;
