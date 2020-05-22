import state from './data/state';
import getters from './data/getters';
import actions from './data/actions';
import mutations from './data/mutations';

const control = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default control;
