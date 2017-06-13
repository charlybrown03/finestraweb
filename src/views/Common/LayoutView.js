import Marionette from 'backbone.marionette'
import Radio from 'backbone.radio'

import LayoutViewTemplate from './templates/LayoutView.hbs'

import HeaderView from '../Header/HeaderView'
import FooterView from '../Footer/FooterView'

const LayoutView = Marionette.View.extend({

  template: LayoutViewTemplate,

  regions: {
    header: {
      el: '.app__header',
      replaceElement: true
    },
    content: {
      el: '.app__content',
      replaceElement: true
    },
    footer: {
      el: '.app__footer',
      replaceElement: true
    }
  },

  channel: Radio.channel('layout'),

  initialize () {
    this.listenTo(this.channel, 'render:region', this._renderRegion, this)
  },

  onRender () {
    this._renderRegion('header', new HeaderView())
    this._renderRegion('footer', new FooterView())
  },

  _renderRegion (region, view) {
    this.getRegion(region).show(view)
  }

})

export default LayoutView
