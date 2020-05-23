<template>
  <v-navigation-drawer v-model="drawer" app right width="450">
    <v-simple-table fixed-header height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th :id="'name'" :width="`70%`" class="text-left">Title</th>
            <th :id="'delete'" :width="`2.5%`"></th>
            <th :id="'quan'" :width="`5%`" class="text-left">QTY</th>
            <th :id="'add'" :width="`2.5%`"></th>
            <th :id="'price'" :width="`25%`" class="text-left">Price</th>
            <th :id="'deleteall'" :width="`2.5%`"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in cartList" :key="book.title + new Date()">
            <td>{{ book.title }}</td>
            <td><v-btn @click="decreaseBook(book)" outlined fab max-width="25px" max-height="25px"
            dark color="red"><v-icon>mdi-minus</v-icon></v-btn></td>
            <td>{{ book.count }}</td>
            <td><v-btn @click="addBook(book)" outlined fab max-width="25px" max-height="25px"
            dark color="green"><v-icon>mdi-plus</v-icon></v-btn></td>
            <td>{{ book.count * Number(book.price) }} &#3647;</td>
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
      <v-spacer/>
      <v-list-item>
        <v-list-item-content>
          <v-btn
            @click="closeDialog()"
            color="white--text indigo darken-4"
          >Go to Bookshelf</v-btn>
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
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialog: false,
      credit: '',
      discountPrice: 0,
      HPBooks: {
        HP1: null,
        HP2: null,
        HP3: null,
        HP4: null,
        HP5: null,
        HP6: null,
        HP7: null,
      },
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
      price -= this.discountPrice;
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
  updated() {
    this.getAllHPBook();
    this.CalculateDiscount();
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
    addBook(book) {
      this.$store.dispatch('data/addBook', book);
    },
    deleteBook(book) {
      this.$store.dispatch('data/deleteBook', book);
    },
    decreaseBook(book) {
      this.$store.dispatch('data/decreaseBook', book);
    },
    Calculate() {
      this.dialog = true;
    },
    findHP(id) {
      const result = this.cartList.find((b) => b.id === id);
      if (result) {
        return JSON.parse(JSON.stringify(result));
      }
      return null;
    },
    getAllHPBook() {
      this.HPBooks = {
        HP1: this.findHP('9781408855652'),
        HP2: this.findHP('9781408855669'),
        HP3: this.findHP('9781408855676'),
        HP4: this.findHP('9781408855683'),
        HP5: this.findHP('9781408855690'),
        HP6: this.findHP('9781408855706'),
        HP7: this.findHP('9781408855713'),
      };
      // console.log(this.HPBooks);
    },
    CalculateDiscount() {
      let series = 0;
      let discount = 0;
      const discountValue = [0, 0, 10, 11, 12, 13, 14, 15];
      let totalPrice = 0;
      const whileCondition = true;
      const HPBookCopies = JSON.parse(JSON.stringify(this.HPBooks));
      while (whileCondition) {
        if (HPBookCopies.HP1) {
          if (HPBookCopies.HP1.count > 0) {
            series += 1;
            HPBookCopies.HP1.count -= 1;
            totalPrice += Number(HPBookCopies.HP1.price);
          }
        }
        if (HPBookCopies.HP2) {
          if (HPBookCopies.HP2.count > 0) {
            series += 1;
            HPBookCopies.HP2.count -= 1;
            totalPrice += Number(HPBookCopies.HP2.price);
          }
        }
        if (HPBookCopies.HP3) {
          if (HPBookCopies.HP3.count > 0) {
            series += 1;
            HPBookCopies.HP3.count -= 1;
            totalPrice += Number(HPBookCopies.HP3.price);
          }
        }
        if (HPBookCopies.HP4) {
          if (HPBookCopies.HP4.count > 0) {
            series += 1;
            HPBookCopies.HP4.count -= 1;
            totalPrice += Number(HPBookCopies.HP4.price);
          }
        }
        if (HPBookCopies.HP5) {
          if (HPBookCopies.HP5.count > 0) {
            series += 1;
            HPBookCopies.HP5.count -= 1;
            totalPrice += Number(HPBookCopies.HP5.price);
          }
        }
        if (HPBookCopies.HP6) {
          if (HPBookCopies.HP6.count > 0) {
            series += 1;
            HPBookCopies.HP6.count -= 1;
            totalPrice += Number(HPBookCopies.HP6.price);
          }
        }
        if (HPBookCopies.HP7) {
          if (HPBookCopies.HP7.count > 0) {
            series += 1;
            HPBookCopies.HP7.count -= 1;
            totalPrice += Number(HPBookCopies.HP7.price);
          }
        }
        // console.log('series', series);
        if (series === 1 || series === 0) {
          this.discountPrice = discount;
          return;
        }

        // console.log('totalPrice', totalPrice);
        discount += (totalPrice * discountValue[series]) / 100;
        // console.log('discountPrice', this.discountPrice);
        series = 0;
        totalPrice = 0;
      }
    },
    clear() {
      this.$store.dispatch('data/clearCart');
      this.credit = '';
      this.discountPrice = 0;
    },
  },
};
</script>
