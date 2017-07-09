import ContentView from '../Common/ContentView'

import CommentsViewTemplate from './templates/CommentsView.hbs'

const CommentsView = ContentView.extend({

  template: CommentsViewTemplate,

  collectionEvents: {
    'sync': 'render'
  },

  ui: {
    toggleButton: '.js-expand__button',
    form: '.c-comment-list-new-comment__form',
    submit: '.c-comment-list__button--submit'
  },

  events: {
    'click @ui.toggleButton': 'onClickToggleButton',
    'submit @ui.form': 'onSubmitForm'
  },

  serializeData () {
    return {
      items: this.collection.toJSON()
    }
  },

  onClickToggleButton (e) {
    this.ui.toggleButton.find('.toggle__icon').toggleClass('is-active');
    this.ui.form.toggleClass('show')
  },

  onSubmitForm () {
    const data = this._getFormData()

    this.model.save(data)

    return false
  },

  onRequest () {
    this.ui.submit.prop('disabled', true)
  },

  onSync () {
    this.onClickToggleButton()
    _.delay(() => this.collection.fetch(), 300)
  },

  onError () {
    this.ui.submit.prop('disabled', false)
    console.error('Something went wrong')
  },

  _getFormData () {
    let data = {}
    _.each(this.ui.form.serializeArray(), (obj) => {
      data[obj.name] = obj.value
    })

    return data
  }

})

export default CommentsView
