
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
  clearCart(state) {
    state.cartList = [];
  },
};

export default mutations;
