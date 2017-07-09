import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

import HeaderViewTemplate from './templates/HeaderView.hbs'

const HeaderView = Marionette.View.extend({

  tagName: 'header',

  className: 'app__header',

  channel: Radio.channel('header'),

  template: HeaderViewTemplate,

  ui: {
    link:'.nav-link'
  },

  events: {
    'click @ui.link': 'onClickLink'
  },

  initialize () {
    this.listenTo(this.channel, 'change:route', this._setActiveLink, this)
  },

  _setActiveLink () {
    const location = window.location.pathname
    _.each(this.ui.link, (link) => {
      const $el = $(link)
      const isActive = $el.data('action') === location

      $el.toggleClass('active', isActive)
      $el.parent().toggleClass('active', isActive)
    })
  },

  onClickLink (e) {
    App.navigate(e.currentTarget.dataset.action)
  }

})

export default HeaderView
