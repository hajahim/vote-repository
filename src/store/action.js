
import Candidates from '../api/Candidates'
import Elections from '../api/Elections'
import ElectionsGroup from '../api/ElectionsGroup'
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
  fetchElectionsGroup ({commit}, playload) {
    ElectionsGroup.getElectionsGroup().then(electionsGroup => {
      commit('FETCH_ELECTIONS_GROUP', electionsGroup)
      commit('UPDATE_LOADING_STATUS', false)
    })
  },
  saveElectionGroup ({commit}, playload) {
    ElectionsGroup.saveElectionsGroup(playload).then(electionGroup => {
      commit('SAVE_ELECTION_GROUP', electionGroup)
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
  getElectionGroupByKey ({commit}, playload) {
    ElectionsGroup.getElectionGroupById(playload).then(electionGroup => {
      const promiseArray = []
      electionGroup.elections.forEach(function (election) {
        const promiseVotes = new Promise((resolve, reject) => {
          Votes.getVotesByElectionId(election.id).then(vote => {
            election.votes = vote
            resolve(vote)
          })
        })
        promiseArray.push(promiseVotes)
      })
      Promise.all(promiseArray).then(() => {
        electionGroup.elections.forEach(function (election) {
          const result = []
          const votesElectionSearch = JSON.stringify(election.votes)
          election.candidats.forEach(function (candidat) {
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
          election.result = sortedResult.slice(0, election.voted).map(result => {
            return `${result.candidat.name} ${result.candidat.firstName} (${result.numberVote}) <br/>`
          })
        })
        commit('GET_ELECTION_GROUP_BY_KEY', electionGroup)
        commit('UPDATE_LOADING_STATUS', false)
      })
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
