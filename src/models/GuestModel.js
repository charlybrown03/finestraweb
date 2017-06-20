import BaseModel from './BaseModel'

const GuestModel = BaseModel.extend({

  defaults: {
    name: '',
    surname: '',
    drinkCode: '',
    complementCode: ''
  },

  endpoint: 'guest',

  parse (obj) {
    obj.drink = this._getByCode(obj, 'drink')
    obj.complement = this._getByCode(obj, 'complement')

    return obj
  },

  validate (obj) {
    const errors = []

    _.each(obj, (value, key) => {
      if (!value) errors.push(key)
    })

    if (errors.length) return errors
  },

  _getByCode (obj, code) {
    const collectionCode = _.capitalize(code)
    const collection = App.Storage[`${collectionCode}s`]

    return collection.findWhere({ code: obj[`${code}Code`] }).get('name')
  }

})

export default GuestModel
