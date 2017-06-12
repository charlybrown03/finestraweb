import Backbone from 'backbone'

const PricesCollection = Backbone.Collection.extend({

  parseData (attributes) {
    const data = _.map(attributes, (range, key) => {
      return {
        name: key,
        prices: this._getPricesSeries(range)
      }
    })

    this.reset(data)
  },

  _getPricesSeries (range) {
    const serie = new Array(24)
    _.each(range, (price) => {
      const key = Object.keys(price)[0]
      const range = key.split('-').map(value => parseInt(value))

      serie.fill(price[key], range[0], (range[1] + 1))
    })

    return serie
  }

})

export default PricesCollection
