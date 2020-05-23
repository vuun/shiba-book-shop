
const mutations = {
  addBook(state, data) {
    if (state.cartList.find((s) => s.title === data.title)) {
      state.cartList.find((s) => s.title === data.title).count += 1;
    } else {
      state.cartList.push({
        cover: data.cover,
        id: data.id,
        price: data.price,
        title: data.title,
        count: 1,
      });
    }
  },
  decreaseBook(state, data) {
    if (state.cartList.find((s) => s.title === data.title)) {
      if (state.cartList.find((s) => s.title === data.title).count > 1) {
        state.cartList.find((s) => s.title === data.title).count -= 1;
      } else {
        state.cartList = state.cartList.filter((s) => s.title !== data.title);
      }
    }
  },
  deleteBook(state, data) {
    state.cartList = state.cartList.filter((s) => s.title !== data.title);
  },
  clearCart(state) {
    state.cartList = [];
  },
};

export default mutations;
