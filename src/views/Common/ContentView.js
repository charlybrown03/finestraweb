import Marionette from 'backbone.marionette'

const ContentView = Marionette.View.extend({

  tagName: 'section',

  className: 'app__content',

  modelEvents: {
    'request': 'onRequest',
    'sync': 'onSync',
    'error': 'onError',
    'invalid': 'onInvalid'
  },

  onRequest () {
    console.log('request', arguments)
  },

  onSync () {
    console.log('sync', arguments)
  },

  onError () {
    console.log('error', arguments)
  },

  onInvalid () {
    console.log('invalid', arguments)
  }

})

export default ContentView
