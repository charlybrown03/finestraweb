import BaseRouter from './BaseRouter'

import CommentsController from '../controllers/CommentsController'

const CommentsRouter = BaseRouter.extend({

  controller: new CommentsController(),

  appRoutes: {
    'comments': 'showComments'
  }

})

export default CommentsRouter
