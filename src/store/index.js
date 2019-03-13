import Vuex from 'vuex'
import Vue from 'vue'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    candidates: [],
    elections: [],
    electionDisplay: null
  },
  getters: {
    getNumberVotesVictory: state => {
      if (state.electionDisplay) {
        return (state.electionDisplay.voterNumber - state.electionDisplay.candidats.length) / 2
      }
      return 0
    }
  },
  mutations: mutations,
  actions: actions
})
