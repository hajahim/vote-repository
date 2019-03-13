
import Candidates from '../api/Candidates'
import Elections from '../api/Elections'

export default {
  fetchCandidates ({commit}, playload) {
    Candidates.getCandidates().then(candidates => {
      commit('FETCH_CANDIDATES', candidates)
    })
  },
  saveCandidate ({commit}, playload) {
    Candidates.saveCandidate(playload).then(candidate => {
      commit('SAVE_CANDIDATE', candidate)
    })
  },
  fetchElections ({commit}, playload) {
    Elections.getElections().then(elections => {
      commit('FETCH_ELECTIONS', elections)
    })
  },
  saveElection ({commit}, playload) {
    Elections.saveElections(playload).then(election => {
      commit('SAVE_ELECTION', election)
    })
  },
  getElectionByKey ({commit}, playload) {
    Elections.getElectionById(playload).then(election => {
      commit('GET_ELECTION_BY_KEY', election)
    })
  }
}
