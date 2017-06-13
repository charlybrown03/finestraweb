import BaseRouter from './BaseRouter'

import FormController from '../controllers/FormController'

const FormRouter = BaseRouter.extend({

  controller: new FormController(),

  appRoutes: {
    '(/)': 'showForm'
  }

})

export default FormRouter
