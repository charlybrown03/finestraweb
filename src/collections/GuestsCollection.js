import BaseCollection from './BaseCollection'

import GuestModel from '../models/GuestModel'

const GuestsCollection = BaseCollection.extend({

  endpoint: 'guests',

  model: GuestModel,

  initialize () {
    this.listenTo(this, 'request', this.onRequest, this)
  },

  onRequest () {
    this.errorMessage = null
  }

})

export default GuestsCollection
