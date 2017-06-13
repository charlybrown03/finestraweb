require('./resources/styles/main.scss')

import Marionette from 'backbone.marionette'

import LayoutView from './views/Common/LayoutView'

import DrinksCollection from './collections/DrinksCollection'
import ComplementsCollection from './collections/ComplementsCollection'

const Finestra = Marionette.Application.extend({

  region: {
    el: '#app',
    replaceElement: true
  },

  onStart () {
    this._initializeStorage(this._startApplication.bind(this))
  },

  _initializeStorage (callback) {
    this.Storage = {
      Drinks: new DrinksCollection(),
      Complements: new ComplementsCollection()
    }

    $.when(
      this.Storage.Drinks.fetch(),
      this.Storage.Complements.fetch()
    ).then(() => {
      if (_.isFunction(callback)) callback()
    })
  },

  _startApplication () {
    this.showView(new LayoutView())
  }

})

export default Finestra
