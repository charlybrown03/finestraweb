import Marionette from 'backbone.marionette'
import Radio from 'backbone.radio'

import CommentsCollection from '../collections/CommentsCollection'
import CommentModel from '../models/CommentModel'

import CommentsView from '../views/Comments/CommentsView'

const CommentsController = Marionette.Object.extend({

  showComments () {
    const model = new CommentModel()
    const collection = new CommentsCollection()

    const view = new CommentsView({ model: model, collection: collection })
    Radio.channel('layout').trigger('render:region', 'content', view)

    view.collection.fetch()
  }

})

export default CommentsController
