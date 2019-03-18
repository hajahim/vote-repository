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

  async getProcesVerbalByElectionId (id) {
    try {
      const procesVerbalCollection = []
      return new Promise((resolve, reject) => {
        this.getProcesVerbal().then(procesVerbals => {
          procesVerbals.forEach(function (procesVerbal) {
            if (procesVerbal.electionId.toLowerCase() === id.toLowerCase()) {
              procesVerbalCollection.push(procesVerbal)
            }
          })
          resolve(procesVerbalCollection[0])
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
          let isExist = false
          const retour = []
          procesVerbals.forEach(function (procesVerbal) {
            if (procesVerbal.electionId.toLowerCase() === data.electionId.toLowerCase()) {
              retour.push(data)
              isExist = true
            } else {
              retour.push(procesVerbal)
            }
          })
          if (!isExist) {
            retour.push(data)
          }
          this.HTTP.put(`/api/jsonBlob/${this.collectionRef}`, retour).then(procesVerbal => {
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
