import BaseCollection from './BaseCollection'

const ComplementsCollection = BaseCollection.extend({

  endpoint: 'complements',

  toDataOptions () {
    return this.map((model) => {
      return { id: model.get('code'), text: model.get('name') }
    })
  }

})

export default ComplementsCollection
