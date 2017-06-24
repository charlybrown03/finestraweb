import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

import GuestsCollection from '../collections/GuestsCollection'
import GuestsView from '../views/Guests/GuestsView'

const GuestsController = Marionette.Object.extend({

  showGuests () {
    const collection = new GuestsCollection()
    const view = new GuestsView({ collection: collection})
    this._renderView(view)

    view.collection.fetch()
  },

  _renderView (view) {
    Radio.channel('layout').trigger('render:region', 'content', view)
  }

})

export default GuestsController
