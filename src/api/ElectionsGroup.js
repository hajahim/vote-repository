import IProvider from './IProvider'

class ElectionsGroup extends IProvider {
  constructor () {
    super()
    this.collectionRef = 'cf9fe548-4810-11e9-b3cd-bfdc891f2052'
  }

  async getElectionsGroup () {
    try {
      return new Promise((resolve, reject) => {
        this.HTTP.get(`/api/jsonBlob/${this.collectionRef}`).then(electionsGroupCollection => {
          resolve(electionsGroupCollection.data)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getElectionGroupById (id) {
    try {
      return new Promise((resolve, reject) => {
        this.getElectionsGroup().then(electionsGroup => {
          electionsGroup.forEach(function (electionGroup) {
            if (electionGroup.id.toLowerCase() === id.toLowerCase()) {
              resolve(electionGroup)
            }
          })
          resolve(null)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async saveElectionsGroup (data) {
    try {
      data.id = this.generateID()
      return new Promise((resolve, reject) => {
        this.getElectionsGroup().then(electionsGroup => {
          electionsGroup.push(data)
          this.HTTP.put(`/api/jsonBlob/${this.collectionRef}`, electionsGroup).then(electionGroup => {
            resolve(data)
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ElectionsGroup()
