import '@testing-library/jest-dom/extend-expect';
import Vue from 'vue';
import Vuetify from 'vuetify';
    
Vue.use(Vuetify);
    
// Required for Vuetify
const app = document.createElement('div');
app.setAttribute('data-app', 'true');
document.body.appendChild(app);