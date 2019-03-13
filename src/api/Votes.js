import IProvider from './IProvider'

class Votes extends IProvider {
  constructor () {
    super()
    this.collectionRef = '01b394fe-45a4-11e9-ae6c-77710e802f6f'
  }

  async getVotes () {
    try {
      return new Promise((resolve, reject) => {
        this.HTTP.get(`/api/jsonBlob/${this.collectionRef}`).then(votesCollection => {
          resolve(votesCollection.data)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getVotesByElectionId (id) {
    try {
      const votesElection = []
      return new Promise((resolve, reject) => {
        this.getVotes().then(votes => {
          votes.forEach(function (vote) {
            if (vote.electionId.toLowerCase() === id.toLowerCase()) {
              votesElection.push(vote)
            }
          })
          resolve(votesElection)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async saveVotes (data) {
    try {
      data.id = this.generateID()
      return new Promise((resolve, reject) => {
        this.getVotes().then(votes => {
          votes.push(data)
          this.HTTP.put(`/api/jsonBlob/${this.collectionRef}`, votes).then(candidat => {
            resolve(data)
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Votes()
