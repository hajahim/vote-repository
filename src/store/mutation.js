export default {
  FETCH_CANDIDATES: (state, playload) => {
    state.candidates = playload
  },
  FETCH_ELECTIONS: (state, playload) => {
    state.elections = playload
  },
  FETCH_ELECTIONS_GROUP: (state, playload) => {
    state.electionsGroup = playload
  },
  SAVE_CANDIDATE: (state, playload) => {
    state.candidates.push(playload)
  },
  UPDATE_STATUS_SEND: (state, playload) => {
    state.isSent = playload
  },
  UPDATE_LOADING_STATUS: (state, playload) => {
    state.loading = playload
  },
  UPDATE_STATUS_SAVED: (state, playload) => {
    state.isSaved = playload
  },
  SAVE_ELECTION: (state, playload) => {
    state.elections.push(playload)
  },
  SAVE_PROCES_VERBAL: (state, playload) => {
    state.procesVerbals.push(playload)
  },
  SAVE_ELECTION_GROUP: (state, playload) => {
    state.electionsGroup.push(playload)
  },
  GET_ELECTION_BY_KEY: (state, playload) => {
    state.electionDisplay = playload
  },
  GET_ELECTION_PV_BY_KEY: (state, playload) => {
    state.pvElection = playload
  },
  GET_ELECTION_GROUP_BY_KEY: (state, playload) => {
    state.electionGroupDisplay = playload
  },
  SAVE_VOTES: (state, playload) => {
    state.votes = playload
  },
  GET_VOTES_BY_ELECTION: (state, playload) => {
    state.votesElection = playload
  }
}
