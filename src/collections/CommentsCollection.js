import BaseCollection from './BaseCollection'

import CommentModel from '../models/CommentModel'

const CommentsCollection = BaseCollection.extend({

  model: CommentModel,

  endpoint: 'comments'

})

export default CommentsCollection
