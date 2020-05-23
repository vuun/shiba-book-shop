// test/TestComponent.spec.js

// Libraries
// import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '@/store';
// import '@testing-library/jest-dom/extend-expect';
import Vue from 'vue';
// Components
import TestComponent from '@/components/Shelf.vue';

// Utilities
import {
  mount,
  createLocalVue,
} from '@vue/test-utils';

Vue.use(Vuetify);

// Required for Vuetify
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);

const localVue = createLocalVue();

describe('TestComponent', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify({
      mocks: {
        $vuetify: {
          lang: {
            t: (val) => val,
          },
        },
        $store: {
          state: {
            cartList: [1, 2, 3],
          },
        },
      },
    });
  });

  it('click at card will add item to cartList', async () => {
    const wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          shelfList: [{
            cover: '',
            id: '9781408855690',
            price: '380',
            title: 'Harry Potter and the Order of the Phoenix (V)',
          }],
        };
      },
    });
    await wrapper.vm.$nextTick();
    const button = wrapper.find('.v-card');

    expect(wrapper.find('.v-card').exists()).toBe(true);

    const spy = jest.spyOn(wrapper.vm, 'addBookToCart');

    button.trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.state.data.cartList.length).toBe(1);
    expect(wrapper.vm.$store.state.data.cartList[0].count).toBe(1);
  });
});
