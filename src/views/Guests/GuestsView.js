import Marionette from 'backbone.marionette'

import GuestsViewTemplate from './templates/GuestsView.hbs'

const GuestsView = Marionette.View.extend({

  template: GuestsViewTemplate

})

export default GuestsView
