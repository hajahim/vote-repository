import IProvider from './IProvider'

class Candidates extends IProvider {
  constructor () {
    super()
    this.collectionRef = '8441f1a3-455d-11e9-ae6c-63911009ce4f'
  }

  async getCandidates () {
    try {
      return new Promise((resolve, reject) => {
        this.getMethod(`/api/jsonBlob/${this.collectionRef}`).then(candidatesCollection => {
          resolve(candidatesCollection.data)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getCandidateById (id) {
    try {
      return new Promise((resolve, reject) => {
        this.getCandidates().then(candidats => {
          candidats.forEach(function (candidat) {
            if (candidat.id.toLowerCase() === id.toLowerCase()) {
              resolve(candidat)
            }
          })
          resolve(null)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async saveCandidate (data) {
    try {
      data.id = this.generateID()
      return new Promise((resolve, reject) => {
        this.getCandidates().then(candidates => {
          candidates.push(data)
          this.putMethod(`/api/jsonBlob/${this.collectionRef}`, candidates).then(candidat => {
            resolve(data)
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Candidates()
