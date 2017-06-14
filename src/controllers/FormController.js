import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

import FormView from '../views/Form/FormView'
import GuestModel from '../models/GuestModel'

const FormController = Marionette.Object.extend({

  showForm () {
    const model = new GuestModel()
    const view = new FormView({ model: model })
    Radio.channel('layout').trigger('render:region', 'content', view)
  }

})

export default FormController
