import IProvider from './IProvider'

class ProcesVerbal extends IProvider {
  constructor () {
    super()
    this.collectionRef = '420a1290-4992-11e9-9547-b9ff43d9d69d'
  }

  async getProcesVerbal () {
    try {
      return new Promise((resolve, reject) => {
        this.HTTP.get(`/api/jsonBlob/${this.collectionRef}`).then(procesVerbalCollection => {
          resolve(procesVerbalCollection.data)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async ggetProcesVerbalByElectionId (id) {
    try {
      const procesVerbalCollection = []
      return new Promise((resolve, reject) => {
        this.getProcesVerbal().then(procesVerbals => {
          procesVerbals.forEach(function (procesVerbal) {
            if (procesVerbal.electionId.toLowerCase() === id.toLowerCase()) {
              procesVerbalCollection.push(procesVerbal)
            }
          })
          resolve(procesVerbalCollection)
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  async saveProcesVerbal (data) {
    try {
      data.id = this.generateID()
      return new Promise((resolve, reject) => {
        this.getProcesVerbal().then(procesVerbals => {
          procesVerbals.push(data)
          this.HTTP.put(`/api/jsonBlob/${this.collectionRef}`, procesVerbals).then(procesVerbal => {
            resolve(data)
          })
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ProcesVerbal()
