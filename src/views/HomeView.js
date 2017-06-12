import Marionette from 'backbone.marionette'
import echarts from 'echarts'

import HomeViewTemplate from './templates/HomeView.hbs'

import chartJson from '../resources/json/chart.json'

const HomeView = Marionette.View.extend({

  id: 'app',

  template: HomeViewTemplate,

  ui: {
    chart: '.echarts_container',
    navs: '.nav-link',
    description: '.description'
  },

  events: {
    'click @ui.navs': 'onClickNav'
  },

  onRender () {
    _.delay(() => {
      this.chart = echarts.init(this.ui.chart[0])
      this._processCurrentRange()
      this._setListeners()
    }, 100)
  },

  onDestroy () {
    this._destroyListeners()
  },

  onClickNav (e) {
    const value = e.currentTarget.dataset.value
    this._toggleNavActive(value)

    this._processCurrentRange()
  },

  _destroyListeners () {
    $(window).off('resize', this.chart.resize)
  },

  _getActiveValue () {
    const activeNav = _.find(this.ui.navs, nav => $(nav).hasClass('active'))
    return activeNav.dataset.value
  },

  _processCurrentRange () {
    const value = this._getActiveValue()

    const dataModel = this.collection.findWhere({ name: value })
    this._renderChart(dataModel)
  },

  _renderChart (dataModel) {
    let option = _.cloneDeep(chartJson)
    option.title.text = dataModel.get('name')
    option.tooltip.formatter = this._tooltipFormatter

    _.each(dataModel.get('prices'), (value, key) => {
      option.xAxis[0].data.push(`${key} - ${key + 1}`)
      option.series[0].data.push(value)
    })
    this.chart.setOption(option)
  },

  _setListeners () {
    if (!this.listeners) $(window).on('resize', this.chart.resize)
    this.listeners = true
  },

  _tooltipFormatter (data) {
    data = data[0]
    return `<b>${data.axisValue} h:</b><br> ${data.data} €/KWh`
  },

  _toggleNavActive (value) {
    _.each(this.ui.navs, (nav) => {
      const $nav = $(nav)
      $nav.toggleClass('active', value === $nav.data('value'))
    })
  }

})

export default HomeView
