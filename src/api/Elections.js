import IProvider from './IProvider'

class Elections extends IProvider {
  constructor () {
    super()
    this.collectionRef = 'fe6c261d-4588-11e9-ae6c-c3f05ae80fc3'
  }

  async getElections () {
    try {
      return new Promise((resolve, reject) => {
        this.HTTP.get(`/api/jsonBlob/${this.collectionRef}`).then(electionsCollection => {
          resolve(electionsCollection.data)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getElectionById (id) {
    try {
      return new Promise((resolve, reject) => {
        this.getElections().then(elections => {
          elections.forEach(function (election) {
            if (election.id.toLowerCase() === id.toLowerCase()) {
              resolve(election)
            }
          })
          resolve(null)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async saveElections (data) {
    try {
      data.id = this.generateID()
      return new Promise((resolve, reject) => {
        this.getElections().then(elections => {
          elections.push(data)
          this.HTTP.put(`/api/jsonBlob/${this.collectionRef}`, elections).then(election => {
            resolve(data)
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Elections()
