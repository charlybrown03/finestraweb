import BaseModel from './BaseModel'

const GuestModel = BaseModel.extend({

  defaults: {
    name: '',
    surname: '',
    drinkCode: '',
    complementCode: ''
  },

  endpoint: 'guest',

  validate (obj) {
    const errors = []

    _.each(obj, (value, key) => {
      if (!value) errors.push(key)
    })

    if (errors.length) return errors
  }

})

export default GuestModel
