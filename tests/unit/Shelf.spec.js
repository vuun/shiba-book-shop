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
            cover: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855690.jpg',
            id: '9781408855690',
            price: '380',
            title: 'Harry Potter and the Order of the Phoenix (V)',
          }],
        };
      },
    });
    expect(wrapper.find('.v-image').exists()).toBe(true);
  });
});
