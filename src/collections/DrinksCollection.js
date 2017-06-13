import BaseCollection from './BaseCollection'

const DrinksCollection = BaseCollection.extend({

  endpoint: 'drinks',

  toDataOptions () {
    return this.map((model) => {
      return { id: model.get('code'), text: model.get('name') }
    })
  }

})

export default DrinksCollection
