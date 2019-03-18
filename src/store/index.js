import Vuex from 'vuex'
import Vue from 'vue'
import actions from './action'
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    candidates: [],
    elections: [],
    electionsGroup: [],
    votes: [],
    procesVerbals: [],
    loading: true,
    votesElection: [],
    electionDisplay: null,
    electionGroupDisplay: null,
    isSent: false,
    isSaved: false
  },
  getters: {
    getNumberVotesVictory: state => {
      if (state.electionDisplay) {
        return Math.floor((state.electionDisplay.voterNumber - state.electionDisplay.candidats.length) / 2 - 1)
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
          dataUser.numberVote = votesElectionSearch.match(regexSearch) ? votesElectionSearch.match(regexSearch).length : 0
          result.push(dataUser)
        })
        let sortedResult = result.sort(function (previous, next) {
          return next.numberVote - previous.numberVote
        })
        sortedResult.forEach(function (votes, index) {
          votes.order = index + 1
          return votes
        })
        return sortedResult
      }
      return null
    }
  },
  mutations: mutations,
  actions: actions
})
