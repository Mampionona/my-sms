<template>
  <canvas id="chart-line" class="chart-canvas"></canvas>
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
    'chartData': function() {
      const chart = this.$jQuery('#chart-line');
      if (chart.length) this.init(chart);
    }
  }
}
</script>
