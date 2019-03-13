import Vuex from 'vuex'
import Vue from 'vue'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    candidates: [],
    elections: [],
    votes: [],
    votesElection: [],
    electionDisplay: null
  },
  getters: {
    getNumberVotesVictory: state => {
      if (state.electionDisplay) {
        return (state.electionDisplay.voterNumber - state.electionDisplay.candidats.length) / 2
      }
      return 0
    },
    getResultElection: state => {
      if (state.votesElection && state.electionDisplay) {
        const result = []
        const votesElectionSearch = JSON.stringify(state.votesElection)
        state.electionDisplay.candidats.forEach(function (candidat) {
          const regexSearch = new RegExp(candidat.id, 'g')
          const dataUser = {}
          dataUser.candidat = candidat
          dataUser.numberVote = votesElectionSearch.match(regexSearch)
          result.push(dataUser)
        })
        return result
      }
      return null
    }
  },
  mutations: mutations,
  actions: actions
})
