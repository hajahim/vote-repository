import axios from 'axios'

class IProvider {
  constructor () {
    this.apiSettings = process.env.APP_SETTINGS.ApiSettings
    this.apiPath = window.location.origin + '/static'
    this.isOffline = process.env.APP_SETTINGS.Offline.Activated === true
    this.HTTP = axios.create({
      baseURL: this.apiSettings.Uri
    })
    this.addingIndicator()
  }

  async getMethod (url) {
    if (!this.isOffline) {
      return this.HTTP.get(url)
    } else {
      const baseUrl = this.apiPath + url
      const urlDatabase = `${baseUrl}.json`
      return this.HTTP.get(urlDatabase)
    }
  }

  async putMethod (url, data) {
    if (!this.isOffline) {
      return this.HTTP.put(url, data)
    } else {
      return new Promise((resolve, reject) => {
        resolve({})
      })
    }
  }

  addingIndicator () {
    this.HTTP.interceptors.request.use(config => {
      window.NProgress.start()
      return config
    })
    this.HTTP.interceptors.response.use(response => {
      window.NProgress.done()
      return response
    })
  }

  generateID () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
}

export default IProvider
