<template>
  <v-navigation-drawer v-model="drawer" app right width="400">
    <v-simple-table fixed-header height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th :id="'name'" :width="`70%`" class="text-left">Title</th>
            <th :id="'quan'" :width="`5%`" class="text-left">QTY</th>
            <th :id="'price'" :width="`25%`" class="text-left">Price</th>
            <th :id="'delete'" :width="`2.5%`"></th>
            <th :id="'deleteall'" :width="`2.5%`"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in cartList" :key="book.title + new Date()">
            <td>{{ book.title }}</td>
            <td>{{ book.count }}</td>
            <td>{{ book.count * Number(book.price) }} &#3647;</td>
            <td><v-btn @click="decreaseBook(book)" outlined fab max-width="25px" max-height="25px"
            dark color="red"><v-icon>mdi-minus</v-icon></v-btn></td>
            <td><v-btn @click="deleteBook(book)" outlined fab max-width="25px" max-height="25px"
            dark color="red"><v-icon>mdi-delete</v-icon></v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-list dense>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Discount</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>- {{ discountPrice }} &#3647;</v-list-item-icon>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Total</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>{{ totalPrice }} &#3647;</v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-text-field v-model="credit" mask="#######" suffix="THB" label="Credit" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn
            :disabled="cartList.length <= 0 || credit === ''"
            @click="Calculate()"
            color="white--text indigo darken-4"
          >Charge</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="280">
      <v-card>
        <v-card-title v-if="change < 0" class="red--text headline">Not Enough Cash</v-card-title>
        <v-simple-table v-if="change < 0" height="150px">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Credit</td>
                <td>{{ credit }} &#3647;</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{{ totalPrice }} &#3647;</td>
              </tr>
              <tr class="red--text">
                <td>Need</td>
                <td>{{ -change }} &#3647;</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-title v-if="change >= 0" class="green--text headline">
          Purchase Successful</v-card-title>
        <v-simple-table v-if="change >= 0" fixed-header height="150px">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>Credit</td>
                <td>{{ credit }} &#3647;</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{{ totalPrice }} &#3647;</td>
              </tr>
              <tr>
                <td>Change</td>
                <td>{{ change }} &#3647;</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      drawer: true,
      dialog: false,
      credit: '',
      discountPrice: 0,
    };
  },
  computed: {
    ...mapState('data', {
      cartList: (state) => state.cartList,
    }),
    totalPrice() {
      let price = 0;
      this.cartList.forEach((book) => {
        price += book.count * Number(book.price);
      });
      return price;
    },
    change() {
      return this.credit - this.totalPrice;
    },
  },
  watch: {
    dialog() {
      if (this.dialog === false) {
        if (this.change >= 0) {
          this.clear();
        }
      }
    },
  },
  methods: {
    deleteBook(book) {
      this.$store.dispatch('data/deleteBook', book);
    },
    decreaseBook(book) {
      this.$store.dispatch('data/decreaseBook', book);
    },
    Calculate() {
      this.dialog = true;
    },
    clear() {
      this.$store.dispatch('data/clearCart');
      this.credit = '';
    },
  },
};
</script>
