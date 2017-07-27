import echarts from 'echarts'

import linechartOption from '../../resources/json/linechart.json'
import piechartOption from '../../resources/json/piechart.json'

import ContentView from '../Common/ContentView'

import SummaryViewTemplate from './templates/SummaryView.hbs'

let drinksChart = null
let complementsChart = null

const PIE_CHART = 'PieChart'
const LINE_CHART = 'LineChart'

const SummaryView = ContentView.extend({

  template: SummaryViewTemplate,

  ui: {
    drinkChart: '.echarts__drinks',
    complementsChart: '.echarts__complements',
    chartTypeButton: '.js-change-chart-type-button'
  },

  events: {
    'click @ui.chartTypeButton': 'onClickChartTypeButton'
  },

  chartType: PIE_CHART,

  serializeData () {
    return {
      drinks: this.getOption('drinks').toJSON(),
      complements: this.getOption('complements').toJSON()
    }
  },

  onRender () {
    _.delay(() => {
      this._initCharts()

      this._setCustomOptions()
      this._renderCharts()
    }, 100)
  },

  onClickChartTypeButton () {
    this.chartType = this.chartType === PIE_CHART ? LINE_CHART : PIE_CHART
    this._renderCharts()
  },

  _renderCharts () {
    const functionName = `_build${this.chartType}`
    this[functionName](drinksChart, 'drinks')
    this[functionName](complementsChart, 'complements')
  },

  _renderLineCharts () {
    this._buildLineChart(drinksChart, 'drinks')
    this._buildLineChart(complementsChart, 'complements')
  },

  _initCharts () {
    drinksChart = echarts.init(this.ui.drinkChart[0])
    complementsChart = echarts.init(this.ui.complementsChart[0])
    this._setListeners()
  },

  _buildLineChart (chart, key) {
    const collection = this.getOption(key)
    let option = _.cloneDeep(linechartOption)

    option.title.text = _.capitalize(key)

    option.xAxis[0].data = collection.map((model) => model.get(key.slice(0, -1)))
    option.series[0].data = collection.map((model) => model.get('ammount'))

    chart.setOption(option)
  },

  _buildPieChart (chart, key) {
    const collection = this.getOption(key)
    let option = _.cloneDeep(piechartOption)

    option.legend.data = collection.map((model) => model.get(key.slice(0, -1)))
    option.series[0].data = collection.map((model) => {
      return {
        value: model.get('ammount'),
        name: model.get(key.slice(0, -1)),
      }
    })

    chart.setOption(option)
  },

  _setCustomOptions () {
    piechartOption.animationDelay = () => Math.random() * 200
  },

  _setListeners () {
    $(window).on('resize', this.resize)
  },

  resize () {
    drinksChart.resize()
    complementsChart.resize()
  },

  onDestroy () {
    $(window).off('resize', this.resize)
  }

})

export default SummaryView
