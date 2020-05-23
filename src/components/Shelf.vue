<template>
  <v-layout wrap>
    <v-pagination v-model="page" :length="shelfLength"></v-pagination>
    <v-row class="fill-height ma-0 pb-7 mb-4" align="center" justify="center">
      <v-card
        align="center"
        class="mx-2"
        v-for="book in shelfList"
        :key="book.title"
        @click="addBookToCart(book)"
        width="156"
      >
        <v-img :src="`${book.cover}`" aspect-ratio="0.65" class="grey lighten-2">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5" />
            </v-row>
          </template>
        </v-img>
        <v-card-text>{{ book.title }}</v-card-text>
        <v-card-text>{{ book.price }} &#3647;</v-card-text>
      </v-card>
    </v-row>
  </v-layout>
</template>

<script>
import apiBook from '@/api/get-book';

export default {
  name: 'Shelf',
  data() {
    return {
      bookList: [],
      shelfList: [],
      page: 1,
      bookPerPage: 10,
    };
  },
  computed: {
    shelfLength() {
      if (this.bookList) {
        return Math.ceil(this.bookList.length / this.bookPerPage);
      }
      return 1;
    },
  },
  beforeMount() {
    this.getBook();
  },
  watch: {
    page() {
      this.shelfList = this.bookList.slice((this.page - 1) * this.bookPerPage,
        (this.page * this.bookPerPage));
    },
  },
  methods: {
    addBookToCart(book) {
      this.$store.dispatch('data/addBook', book);
    },
    async getBook() {
      const result = await apiBook();
      this.bookList = result.books;
      this.shelfList = this.bookList.slice((this.page - 1) * this.bookPerPage,
        (this.page * this.bookPerPage));
      // console.log(this.bookList);
    },
  },
};
</script>
