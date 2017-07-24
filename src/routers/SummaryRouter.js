import BaseRouter from './BaseRouter'

import SummaryController from '../controllers/SummaryController'

const SummaryRouter = BaseRouter.extend({

  controller: new SummaryController(),

  appRoutes: {
    'summary(/)': 'showSummary'
  }

})

export default SummaryRouter
