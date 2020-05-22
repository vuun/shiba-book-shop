<template>
  <v-layout wrap>
    <v-card
      class="ma-2"
      v-for="book in bookList"
      :key="book.title"
      @click="addBookToCart(book)"
      width="144"
    >
      <v-img :src="`${book.cover}`" aspect-ratio="0.65" class="grey lighten-2">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5" />
          </v-row>
        </template>
      </v-img>
      <v-card-text>{{ book.title }}</v-card-text>
      <v-card-text>{{ book.price }} Baht</v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import apiBook from '@/api/get-book';

export default {
  name: 'Shelf',
  data() {
    return {
      bookList: [],
    };
  },
  beforeMount() {
    this.getBook();
  },
  methods: {
    addBookToCart(book) {
      this.$store.dispatch('data/addBook', book);
    },
    async getBook() {
      const result = await apiBook();
      this.bookList = result.books;
      // console.log(this.bookList);
    },
  },
};
</script>
