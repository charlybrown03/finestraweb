import echarts from 'echarts'

import ContentView from '../Common/ContentView'

import SummaryViewTemplate from './templates/SummaryView.hbs'

// const chartJson = {
//    "title": {
//        "text": ""
//    },
//    "tooltip" : {
//        "trigger": "axis"
//    },
//    "legend": {
//        "data":[]
//    },
//    "grid": {
//        "left": "3%",
//        "right": "4%",
//        "bottom": "3%",
//        "containLabel": true
//    },
//    "xAxis" : [
//        {
//            "type" : "category",
//            "boundaryGap" : false,
//            "data" : []
//        }
//    ],
//    "yAxis" : [
//        {
//            "type" : "value"
//        }
//    ],
//    "series" : [
//        {
//            "name":"",
//            "type":"line",
//            "data":[]
//        }
//    ]
// }

const chartJson = {
    backgroundColor: '#fff',
    title: {
        text: '',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#000'
        }
    },
    legend: {
      x: 'left',
      textStyle: {
          color: '#000'
      },
      data: []
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    series : [
        {
            type:'pie',
            center: ['50%', '50%'],
            data:[],
            // TODO: Disable label
            label: {
                normal: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
}

const SummaryView = ContentView.extend({

  template: SummaryViewTemplate,

  ui: {
    drinkChart: '.echarts__drinks',
    complementsChart: '.echarts__complements'
  },

  onRender () {
    _.delay(() => {
      this.drinksChart = echarts.init(this.ui.drinkChart[0])
      this.complementsChart = echarts.init(this.ui.complementsChart[0])
      this._renderPieChart(this.drinksChart, 'drinks')
      this._renderPieChart(this.complementsChart, 'complements')
    }, 100)
  },

  _renderChart (chart, key) {
    const collection = this.getOption(key)
    let option = _.cloneDeep(chartJson)

    option.title.text = _.capitalize(key)

    option.xAxis[0].data = collection.map((model) => model.get(key.slice(0, -1)))
    option.series[0].data = collection.map((model) => model.get('ammount'))

    chart.setOption(option)
  },

  _renderPieChart (chart, key) {
    const collection = this.getOption(key)
    let option = _.cloneDeep(chartJson)

    option.legend.data = collection.map((model) => model.get(key.slice(0, -1)))
    option.series[0].data = collection.map((model) => {
      return {
        value: model.get('ammount'),
        name: model.get(key.slice(0, -1)),
      }
    })

    chart.setOption(option)
  }

})

export default SummaryView
