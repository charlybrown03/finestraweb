import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

import GuestsView from '../views/Guests/GuestsView'

const GuestsController = Marionette.Object.extend({

  showGuests () {
    Radio.channel('layout').trigger('render:region', 'content', new GuestsView())
  }

})

export default GuestsController
