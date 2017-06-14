import BaseRouter from './BaseRouter'

import GuestsController from '../controllers/GuestsController'

const GuestRouter = BaseRouter.extend({

  controller: new GuestsController(),

  appRoutes: {
    'guests(/)': 'showGuests'
  }

})

export default GuestRouter
