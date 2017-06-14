import select2 from 'select2'

import ContentView from '../Common/ContentView'

import FormViewTemplate from './templates/FormView.hbs'

const FormView = ContentView.extend({

  template: FormViewTemplate,

  ui: {
    drink: '.drink_select',
    complement: '.complement_select',
    input: 'input'
  },

  events: {
    'change @ui.drink': 'onChangeDrink',
    'change @ui.complement': 'onChangeComplement',
    'keyup @ui.input': 'onInput'
  },

  onRender () {
    this._initSelect2()
  },

  onChangeDrink (e) {
    this._setAttr('drink', e.currentTarget.value)
  },

  onChangeComplement (e) {
    this._setAttr('complement', e.currentTarget.value)
  },

  onInput (e) {
    const $el = $(e.currentTarget)
    const attr = $el.data('attr')
    const value = $el.val()

    this._setAttr(attr, value)
  },

  _initSelect2 () {
    this.ui.drink.select2({
      width: '100%',
      placeholder: 'Bebida',
      minimumResultsForSearch: Infinity,
      data: App.Storage.Drinks.toDataOptions()
    })

    this.ui.complement.select2({
      width: '100%',
      placeholder: 'Acompañamiento',
      minimumResultsForSearch: Infinity,
      data: App.Storage.Complements.toDataOptions()
    })
  },

  _setAttr (attr = '', value = '') {
    this.model.set(attr, value)
  }
})

export default FormView
