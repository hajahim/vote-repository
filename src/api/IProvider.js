import axios from 'axios'

class IProvider {
  constructor () {
    this.settings = process.env.APP_SETTINGS.ApiSettings
    this.HTTP = axios.create({
      baseURL: this.settings.Uri
    })
  }

  generateID () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
}

export default IProvider
