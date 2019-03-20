
import Candidates from '../api/Candidates'
import Elections from '../api/Elections'
import ElectionsGroup from '../api/ElectionsGroup'
import Votes from '../api/Votes'
import ProcesVerbal from '../api/ProcesVerbal'

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
    const candidats = playload.candidats.map((candidat, index) => {
      const candidatTemp = Object.assign({}, candidat)
      candidatTemp.lotteryNumber = index + 1
      return candidatTemp
    })
    playload.candidats = candidats
    Elections.saveElections(playload).then(election => {
      commit('SAVE_ELECTION', election)
      commit('UPDATE_STATUS_SEND', false)
      commit('UPDATE_STATUS_SAVED', false)
    })
  },
  saveProvesVerbal ({commit}, playlaod) {
    ProcesVerbal.saveProcesVerbal(playlaod).then(procesVerbal => {
      Elections.getElectionById(procesVerbal.electionId).then(election => {
        ProcesVerbal.getProcesVerbalByElectionId(election.id).then(procesVerbal => {
          commit('GET_ELECTION_PV_BY_KEY', procesVerbal)
          commit('GET_ELECTION_BY_KEY', election)
          commit('SAVE_PROCES_VERBAL', procesVerbal)
          commit('UPDATE_STATUS_SEND', false)
          commit('UPDATE_STATUS_SAVED', false)
        })
      })
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
      ProcesVerbal.getProcesVerbalByElectionId(election.id).then(procesVerbal => {
        commit('GET_ELECTION_PV_BY_KEY', procesVerbal)
        commit('GET_ELECTION_BY_KEY', election)
        commit('UPDATE_LOADING_STATUS', false)
      })
    })
  },
  getElectionPvByKey ({commit}, playload) {
    ProcesVerbal.getProcesVerbalByElectionId(playload).then(procesVerbal => {
      commit('GET_ELECTION_PV_BY_KEY', procesVerbal)
      commit('UPDATE_LOADING_STATUS', false)
    })
  },
  getElectionGroupByKey ({commit}, playload) {
    ElectionsGroup.getElectionGroupById(playload).then(electionGroup => {
      const promiseArray = []
      electionGroup.elections.forEach(function (election) {
        const promiseVotes = new Promise((resolve, reject) => {
          if (election.type === 'normal') {
            Votes.getVotesByElectionId(election.id).then(vote => {
              election.votes = vote
              resolve(vote)
            })
          } else {
            ProcesVerbal.getProcesVerbalByElectionId(election.id).then(procesVerbal => {
              election.procesVerbal = procesVerbal
              resolve(procesVerbal)
            })
          }
        })
        promiseArray.push(promiseVotes)
      })
      Promise.all(promiseArray).then(() => {
        electionGroup.elections.forEach(function (election) {
          const result = []
          const votesElectionSearch = JSON.stringify(election.votes)
          let totalVotes = 0
          election.candidats.forEach(function (candidat) {
            const dataUser = {}
            dataUser.candidat = candidat
            if (election.type === 'normal') {
              const regexSearch = new RegExp(candidat.id, 'g')
              dataUser.numberVote = votesElectionSearch.match(regexSearch) ? votesElectionSearch.match(regexSearch).length : 0
              result.push(dataUser)
            } else {
              let numberVote = 0
              election.procesVerbal.pv[candidat.id].forEach(function (value) {
                numberVote += parseInt(value)
              })
              dataUser.numberVote = numberVote
              totalVotes += numberVote
              result.push(dataUser)
            }
          })
          let sortedResult = result.sort(function (previous, next) {
            return next.numberVote - previous.numberVote
          })
          sortedResult.forEach(function (votes, index) {
            votes.order = index + 1
            return votes
          })
          election.totalVotes = totalVotes
          election.result = sortedResult.slice(0, election.voted).map(result => {
            const percent = ((result.numberVote / totalVotes) * 100).toFixed(2)
            return `${result.candidat.name} ${result.candidat.firstName} (${percent}%) <br/>`
          }).join(' ')
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
