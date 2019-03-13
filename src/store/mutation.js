export default {
  FETCH_CANDIDATES: (state, playload) => {
    state.candidates = playload
  },
  FETCH_ELECTIONS: (state, playload) => {
    state.elections = playload
  },
  SAVE_CANDIDATE: (state, playload) => {
    state.candidates.push(playload)
  },
  SAVE_ELECTION: (state, playload) => {
    state.elections.push(playload)
  },
  GET_ELECTION_BY_KEY: (state, playload) => {
    state.electionDisplay = playload
  }
}
