<template>
  <canvas class="chart-canvas"></canvas>
</template>

<script>
import 'chart.js';
import '@/assets/js/argon.js';
export default {
  props: {
    chartData: Object,
    type: {
      default: 'line',
      type: String
    }
  },
  methods: {
    init(chart) {
      const chartObject = new Chart(chart, {
        type: this.type,
        options: {
          scales: {
            yAxes: [
              {
                gridLines: {
                  color: '#e9ecef',
                  zeroLineColor: '#e9ecef',
                  lineWidth: 1,
                  zeroLineWidth: 1
                }
              }
            ]
          }
        },
        data: this.chartData
      });      
      chart.data('chart', chartObject);
    }
  },
  watch: {
    // re-render chart canvas
    chartData () {
      const chart = this.$jQuery(this.$el);
      if (chart.length) this.init(chart);
    }
  }
}
</script>
