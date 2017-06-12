require('./resources/styles/main.scss')

import Marionette from 'backbone.marionette'

import HomeView from './views/HomeView'
import PricesCollection from './collections/PricesCollection'

import prices from './resources/json/prices.json'

const HolaLuz = Marionette.Application.extend({

  region: {
    el: '#app',
    replaceElement: true
  },

  onStart () {
    const pricesCollection = new PricesCollection()
    pricesCollection.parseData(prices)

    this.showView(new HomeView({ collection: pricesCollection }))
  }

})

export default HolaLuz
