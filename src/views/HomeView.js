import Marionette from 'backbone.marionette'

import HomeViewTemplate from './templates/HomeView.hbs'

const HomeView = Marionette.View.extend({

  id: 'app',

  template: HomeViewTemplate,

  ui: {
    navs: '.nav-link'
  },

  events: {
    'click @ui.navs': 'onClickNav'
  },

  onRender () {

  },

  onDestroy () {
    this._destroyListeners()
  },

  onClickNav (e) {
    const value = e.currentTarget.dataset.value
    this._toggleNavActive(value)

    // TODO: Action on click nav
  },

  _destroyListeners () {
    // TODO: Shutdown listeners
  },

  _getActiveValue () {
    const activeNav = _.find(this.ui.navs, nav => $(nav).hasClass('active'))
    return activeNav.dataset.value
  },

  _toggleNavActive (value) {
    _.each(this.ui.navs, (nav) => {
      const $nav = $(nav)
      $nav.toggleClass('active', value === $nav.data('value'))
    })
  }

})

export default HomeView
