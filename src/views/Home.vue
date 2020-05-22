<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo darken-4" dark>
      <v-spacer></v-spacer>

      <v-toolbar-title>Shiba Book Shop</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <Shelf/>
      </v-container>
    </v-content>

    <v-footer color="indigo darken-4" app>
      <v-spacer></v-spacer>

      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
import Shelf from '@/components/Shelf.vue';

export default {
  name: 'Home',
  components: {
    Shelf,
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
