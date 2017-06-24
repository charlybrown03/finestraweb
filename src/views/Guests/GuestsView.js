import Marionette from 'backbone.marionette'

import GuestsViewTemplate from './templates/GuestsView.hbs'

const GuestsView = Marionette.View.extend({

  template: GuestsViewTemplate,

  collectionEvents: {
    'sync': 'render',
    'request': 'render',
    'error': 'onError'
  },

  serializeData () {
    return {
      items: this.collection.toJSON(),
      requesting: this.collection.isRequesting,
      errorMessage: this.collection.errorMessage
    }
  },

  onError () {
    this.collection.errorMessage = 'No hay nadie apuntado aún'
    this.render()
  }

})

export default GuestsView
