import BaseCollection from './BaseCollection'

import GuestModel from '../models/GuestModel'

const GuestsCollection = BaseCollection.extend({

  endpoint: 'guests',

  model: GuestModel,

  initialize () {
    this.listenTo(this, 'request', this.onRequest, this)
    this.listenTo(this, 'sync', this.onSync, this)
    this.listenTo(this, 'error', this.onError, this)
  },

  onRequest () {
    this.errorMessage = null
    this.isRequesting = true
  },

  onSync () {
    this.isRequesting = false
  },

  onError () {
    this.isRequesting = false
  }

})

export default GuestsCollection
