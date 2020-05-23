<template>
  <div>
    <Cart :drawer="drawer" @close="drawer = false"/>

    <v-app-bar app color="indigo darken-4" dark>
      <v-spacer></v-spacer>

      <v-toolbar-title>Shiba Book Shop</v-toolbar-title>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <Shelf />
      </v-container>
    </v-content>

    <v-footer color="indigo darken-4" app>
      <v-spacer></v-spacer>

      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue';
import Shelf from '@/components/Shelf.vue';

export default {
  name: 'Home',
  components: {
    Shelf,
    Cart,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
