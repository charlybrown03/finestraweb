import Marionette from 'backbone.marionette'

import CommentsViewTemplate from './templates/CommentsView.hbs'

const CommentsView = Marionette.View.extend({

  template: CommentsViewTemplate,

  collectionEvents: {
    'sync': 'render'
  },

  ui: {
    toggleButton: '.js-expand__button',
    form: '.c-comment-list-new-comment__form'
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

    this.model.save(data).then(() => {
      this.onClickToggleButton()
      _.delay(() => this.collection.fetch(), 300)
    })

    return false
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
