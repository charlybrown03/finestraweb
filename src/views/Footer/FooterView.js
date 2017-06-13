import Marionette from 'backbone.marionette'

import FooterViewTemplate from './templates/FooterView.hbs'

const FooterView = Marionette.View.extend({

  tagName: 'footer',

  className: 'app__footer',

  template: FooterViewTemplate

})

export default FooterView
