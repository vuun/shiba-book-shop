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

  it('if there is no shelfList then v-image wont appear', async () => {
    const wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          shelfList: [],
        };
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.v-image').exists()).toBe(false);
  });

  it('if there is shelfList then v-image will appear', async () => {
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

    expect(wrapper.find('.v-image').exists()).toBe(true);
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
    const button = wrapper.find('.v-card');

    expect(wrapper.find('.v-card').exists()).toBe(true);

    const spy = jest.spyOn(wrapper.vm, 'addBookToCart');

    button.trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$store.state.data.cartList.length).toBe(1);
    expect(wrapper.vm.$store.state.data.cartList[0].count).toBe(1);
  });

  it('click at card 3 times that book will have count = 3', async () => {
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
    const button = wrapper.find('.v-card');

    expect(wrapper.find('.v-card').exists()).toBe(true);

    const spy = jest.spyOn(wrapper.vm, 'addBookToCart');

    // have clicked 1 time from last test
    expect(wrapper.vm.$store.state.data.cartList[0].count).toBe(1);
    button.trigger('click');
    expect(wrapper.vm.$store.state.data.cartList[0].count).toBe(2);
    button.trigger('click');
    expect(wrapper.vm.$store.state.data.cartList[0].count).toBe(3);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
