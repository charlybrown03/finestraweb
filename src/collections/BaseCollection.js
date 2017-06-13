import Backbone from 'backbone'

const BaseCollection = Backbone.Collection.extend({

  baseUrl: 'http://finestra-wedding.tk:8080',

  endpoint: '',

  url () {
    return `${this.baseUrl}/${this.endpoint}`
  }

})

export default BaseCollection
