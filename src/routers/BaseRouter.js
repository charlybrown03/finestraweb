import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

const BaseRouter = Marionette.AppRouter.extend({

  channel: Radio.channel('header'),

  onRoute () {
    this.channel.trigger('change:route')
  }

})

export default BaseRouter
