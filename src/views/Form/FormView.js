import select2 from 'select2'

import ContentView from '../Common/ContentView'

import FormViewTemplate from './templates/FormView.hbs'

const FormView = ContentView.extend({

  template: FormViewTemplate,

  ui: {
    drink: '.drink_select',
    complement: '.complement_select',
    input: 'input',
    submit: '.submit__button'
  },

  events: {
    'change @ui.drink': 'onChangeDrink',
    'change @ui.complement': 'onChangeComplement',
    'keyup @ui.input': 'onInput',
    'click @ui.submit': 'onClickSubmit'
  },

  onRender () {
    this._initSelect2()
  },

  onChangeDrink (e) {
    this._cleanErrors()
    this._setAttr('drinkCode', e.currentTarget.value)
  },

  onChangeComplement (e) {
    this._cleanErrors()
    this._setAttr('complementCode', e.currentTarget.value)
  },

  onInput (e) {
    this._cleanErrors()
    const $el = $(e.currentTarget)
    const attr = $el.data('attr')
    const value = $el.val()

    this._setAttr(attr, value)
  },

  onClickSubmit () {
    this.model.save()
  },

  onInvalid (model, errors) {
    const $el = this.$el
    _.each(errors, (error) => {
      if (error.indexOf('Code') >= 0) error = error.replace('Code', '')

      const selector = this.ui[error] || $el.find(`[data-attr="${error}"]`)
      const tag = _.capitalize(selector.prop('tagName'))

      this[`_process${tag}Error`](selector.parents('.form-group'))
    })
  },

  onRequest () {
    this.ui.submit.prop('disabled', true)
  },

  onSync () {
    App.navigate('guests')
  },

  onError () {
    this.ui.submit.prop('disabled', false)
    console.error('Something went wrong')
  },

  _cleanErrors () {
    const $el = this.$el
    $el.find('.form-group').removeClass('has-danger')
    $el.find('.select2-selection').removeClass('has-danger')
  },

  _processInputError (parent) {
    parent.addClass('has-danger')
  },

  _processSelectError (parent) {
    parent.find('.select2-selection').addClass('has-danger')
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
