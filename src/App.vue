<template>
  <div id="app">
    <v-app>
      <home/>
    </v-app>
  </div>
</template>

<script>
import home from '@/views/Home.vue';

export default {
  name: 'App',
  components: {
    home,
  },
};
</script>
