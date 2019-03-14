import axios from 'axios'

class IProvider {
  constructor () {
    this.settings = process.env.APP_SETTINGS.ApiSettings
    this.HTTP = axios.create({
      baseURL: this.settings.Uri
    })
    this.addingIndicator()
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
