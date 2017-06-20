import BaseCollection from './BaseCollection'

import GuestModel from '../models/GuestModel'

const GuestsCollection = BaseCollection.extend({

  endpoint: 'guests',

  model: GuestModel

})

export default GuestsCollection
