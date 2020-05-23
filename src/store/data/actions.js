const actions = {
  addBook({ commit }, data) {
    commit('addBook', data);
  },
  decreaseBook({ commit }, data) {
    commit('decreaseBook', data);
  },
  deleteBook({ commit }, data) {
    commit('deleteBook', data);
  },
  clearCart({ commit }) {
    commit('clearCart');
  },
};

export default actions;
