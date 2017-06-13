import select2 from 'select2'

import ContentView from '../Common/ContentView'

import FormViewTemplate from './templates/FormView.hbs'

const FormView = ContentView.extend({

  template: FormViewTemplate,

  ui: {
    drink: '.drink_select',
    complement: '.complement_select'
  },

  onRender () {
    this._initSelect2()
  },

  _initSelect2 () {
    this.ui.drink.select2({
      width: '100%',
      minimumResultsForSearch: Infinity,
      data: App.Storage.Drinks.toDataOptions()
    })

    this.ui.complement.select2({
      width: '100%',
      minimumResultsForSearch: Infinity,
      data: App.Storage.Complements.toDataOptions()
    })
  }
})

export default FormView
