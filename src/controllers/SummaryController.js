import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'


import DrinksSummaryCollection from '../collections/DrinksSummaryCollection'
import ComplementsSummaryCollection from '../collections/ComplementsSummaryCollection'
import SummaryView from '../views/Summary/SummaryView'

const GuestsController = Marionette.Object.extend({

  showSummary () {
    const drinksCollection = new DrinksSummaryCollection()
    const complementsCollection = new ComplementsSummaryCollection()

    const view = new SummaryView({
      drinks: drinksCollection,
      complements: complementsCollection
    })

    $.when(drinksCollection.fetch(), complementsCollection.fetch()).then(() => {
      this._renderView(view)
    })
  },

  _renderView (view) {
    Radio.channel('layout').trigger('render:region', 'content', view)
  }

})

export default GuestsController
