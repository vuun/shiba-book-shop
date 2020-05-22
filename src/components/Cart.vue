<template>
  <v-navigation-drawer v-model="drawer" app right width="400">
    <v-simple-table fixed-header height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th :id="'name'" class="text-left">Title</th>
            <th :id="'quan'" class="text-left">Quantity</th>
            <th :id="'price'" class="text-left">Price(THB)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in cartList" :key="book.title + new Date()">
            <td>{{ book.title }}</td>
            <td>{{ book.count }}</td>
            <td>{{ book.count * Number(book.price) }}</td>
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
        <v-list-item-icon>- {{ totalPrice }}</v-list-item-icon>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Total</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>{{ totalPrice }}</v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn @click="Calculate()" dark color="indigo darken-4">Charge</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      drawer: true,
      discountPrice: 0,
      totalPrice: 0,
    };
  },
  computed: {
    ...mapState('data', {
      cartList: (state) => state.cartList,
    }),
  },
  methods: {
    Calculate() {
      this.$store.dispatch('data/clearCart');
    },
  },
};
</script>
