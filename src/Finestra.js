require('./resources/styles/main.scss')

import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import routers from './routers'

import LayoutView from './views/Common/LayoutView'

import DrinksCollection from './collections/DrinksCollection'
import ComplementsCollection from './collections/ComplementsCollection'

const Finestra = Marionette.Application.extend({

  region: {
    el: '#app',
    replaceElement: true
  },

  onBeforeStart () {
    this.Routers = routers()
  },

  onStart () {
    this._initializeStorage(null, this._startApplication.bind(this))
  },

  navigate: function (url, options = {}) {
    var defaults = {
      trigger: true
    }

    options = _.extend(defaults, options || {})

    Backbone.history.navigate(url, options)
  },

  _initializeStorage (options, callback) {
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

    Backbone.history.start({
      root: '/',
      pushState: true,
      silent: false
    })

    this.navigate(window.location.pathname || '/')
  }

})

export default Finestra
