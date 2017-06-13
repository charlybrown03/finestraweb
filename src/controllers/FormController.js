import Marionette from 'backbone.marionette'

import Radio from 'backbone.radio'

import FormView from '../views/Form/FormView'

const FormController = Marionette.Object.extend({

  showForm () {
    Radio.channel('layout').trigger('render:region', 'content', new FormView())
  }

})

export default FormController
