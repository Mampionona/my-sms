import { Line, mixins } from 'vue-chartjs';
import Chart from '@/assets/js/argon';

const { reactiveProp } = mixins;

export default {
  created() {
    Chart();
  },
  data() {
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
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
