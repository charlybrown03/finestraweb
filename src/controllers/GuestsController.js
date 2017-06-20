import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

import GuestsCollection from '../collections/GuestsCollection'
import GuestsView from '../views/Guests/GuestsView'

const GuestsController = Marionette.Object.extend({

  showGuests () {
    const collection = new GuestsCollection()
    const view = new GuestsView({ collection: collection})
    $.when(view.collection.fetch()).then(this._renderView.bind(view), this._renderView.bind(view))
  },

  _renderView () {
    console.log('holi')
    Radio.channel('layout').trigger('render:region', 'content', this)
  }

})

export default GuestsController
