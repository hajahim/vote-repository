
import Candidates from '../api/Candidates'
import Elections from '../api/Elections'
import Votes from '../api/Votes'

export default {
  fetchCandidates ({commit}, playload) {
    Candidates.getCandidates().then(candidates => {
      commit('FETCH_CANDIDATES', candidates)
      commit('UPDATE_LOADING_STATUS', false)
    })
  },
  saveCandidate ({commit}, playload) {
    Candidates.saveCandidate(playload).then(candidate => {
      commit('SAVE_CANDIDATE', candidate)
      commit('UPDATE_STATUS_SEND', false)
      commit('UPDATE_STATUS_SAVED', false)
    })
  },
  updateStatusSave ({commit}, playload) {
    commit('UPDATE_STATUS_SAVED', playload)
  },
  updateStatusSend ({commit}, playload) {
    commit('UPDATE_STATUS_SEND', playload)
  },
  fetchElections ({commit}, playload) {
    Elections.getElections().then(elections => {
      commit('FETCH_ELECTIONS', elections)
      commit('UPDATE_LOADING_STATUS', false)
    })
  },
  updateLoadingStatus ({commit}, playload) {
    commit('UPDATE_LOADING_STATUS', playload)
  },
  saveElection ({commit}, playload) {
    Elections.saveElections(playload).then(election => {
      commit('SAVE_ELECTION', election)
      commit('UPDATE_STATUS_SEND', false)
      commit('UPDATE_STATUS_SAVED', false)
    })
  },
  getElectionByKey ({commit}, playload) {
    Elections.getElectionById(playload).then(election => {
      commit('GET_ELECTION_BY_KEY', election)
      commit('UPDATE_LOADING_STATUS', false)
    })
  },
  saveVotes ({commit}, playload) {
    Votes.saveVotes(playload).then(votes => {
      commit('SAVE_VOTES', votes)
      Votes.getVotesByElectionId(votes.electionId).then(election => {
        commit('GET_VOTES_BY_ELECTION', election)
      })
    })
  },
  getVotesByElection ({commit}, playload) {
    Votes.getVotesByElectionId(playload).then(votes => {
      commit('GET_VOTES_BY_ELECTION', votes)
    })
  }
}
