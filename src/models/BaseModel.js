import Backbone from 'backbone'

const BaseModel = Backbone.Model.extend({

  baseUrl: 'http://finestra-wedding.tk:8080',

  endpoint: '',

  url () {
    let url = `${this.baseUrl}/${this.endpoint}`
    if (this.get('id')) url += `?${this.get('id')}`

    return url
  }

})

export default BaseModel
