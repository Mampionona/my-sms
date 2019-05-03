import { Line, mixins } from 'vue-chartjs';
import '@/assets/js/argon.js';
const { reactiveProp } = mixins;

export default {
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: '#e9ecef',
              zeroLineColor: '#e9ecef',
              lineWidth: 1,
              zeroLineWidth: 1
            }
          }]
        }
      }
    };
  },
  extends: Line,
  mixins: [reactiveProp],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
