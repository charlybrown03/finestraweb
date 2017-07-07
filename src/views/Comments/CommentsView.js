import Marionette from 'backbone.marionette'

import CommentsViewTemplate from './templates/CommentsView.hbs'

const CommentsView = Marionette.View.extend({

  template: CommentsViewTemplate,

  collectionEvents: {
    'sync': 'render'
  }

})

export default CommentsView
