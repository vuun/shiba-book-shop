// test/TestComponent.spec.js

// Libraries
// import Vue from 'vue';
import Vuetify from 'vuetify';
import store from '@/store';
// import '@testing-library/jest-dom/extend-expect';
import Vue from 'vue';
// Components
import TestComponent from '@/components/Cart.vue';

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

  it('click btn btnCloseDialog then call closeDialog', () => {
    const wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      store,
    });
    // mount btn
    const button = wrapper.find('.btnCloseDialog');

    expect(wrapper.find('.btnCloseDialog').exists()).toBe(true);

    const spy = jest.spyOn(wrapper.vm, 'closeDialog');

    button.trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('click btnCharge then dont call Calculate', () => {
    const wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      store,
    });
    // mount btn
    const button = wrapper.find('.btnCharge');

    expect(wrapper.find('.btnCharge').exists()).toBe(true);

    const spy = jest.spyOn(wrapper.vm, 'Calculate');

    button.trigger('click');

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('click btnCharge then call Calculate (cartGotvalue and got credit)', async () => {
    const wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      store,
      data() {
        return {
          credit: '2',
        };
      },
      computed: {
        cartLength() {
          return 1;
        },
      },
    });
    // mount btn
    const button = wrapper.find('.btnCharge');

    expect(wrapper.find('.btnCharge').exists()).toBe(true);

    const spy = jest.spyOn(wrapper.vm, 'Calculate');

    button.trigger('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('when have item there is minus/plus/delete btn', async () => {
    const wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      store,
      computed: {
        cartList() {
          return [
            {
              count: 1,
              cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
              id: '9781408855690',
              price: '380',
              title: 'Harry Potter and the Order of the Phoenix (V)',
            },
          ];
        },
      },
    });
    expect(wrapper.find('.plus').exists()).toBe(true);
    expect(wrapper.find('.minus').exists()).toBe(true);
    expect(wrapper.find('.delete').exists()).toBe(true);
  });
});
