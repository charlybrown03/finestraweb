import ContentView from '../Common/ContentView'

import GuestsViewTemplate from './templates/GuestsView.hbs'

const GuestsView = ContentView.extend({

  template: GuestsViewTemplate,

  collectionEvents: {
    'sync': 'render',
    'request': 'render',
    'error': 'onError'
  },

  ui: {
    summaryButton: '.js-summary-button'
  },

  events: {
    'click @ui.summaryButton': 'onClickSummaryButton'
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
  },

  onClickSummaryButton () {
    App.navigate('/summary')
  }

})

export default GuestsView
