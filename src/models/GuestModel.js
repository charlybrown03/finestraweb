import BaseModel from './BaseModel'

const GuestModel = BaseModel.extend({

  defaults: {
    name: '',
    surname: '',
    drink: '',
    complement: ''
  },

  endpoint: 'guest'

})

export default GuestModel
