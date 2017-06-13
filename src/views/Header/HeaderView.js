import Marionette from 'backbone.marionette'

import HeaderViewTemplate from './templates/HeaderView.hbs'

const HeaderView = Marionette.View.extend({

  tagName: 'header',

  className: 'app__header',

  template: HeaderViewTemplate

})

export default HeaderView
