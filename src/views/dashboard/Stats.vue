<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h6 class="surtitle">Overview</h6>
          <h5 class="h3 mb-0">Messages envoyés</h5>
        </div>
        <div class="card-body">
          <div class="chart">
            <line-chart :chart-data="dataCollection" :styles="{height: '100%'}"></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/LineChart.js';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      stats: 'campaigns/stats'
    }),
    dataCollection () {
      const labels = ['', ...this.stats.map(stat => stat.date)];
      const datasets = [{
        label: 'Messages',
        data: [0, ...this.stats.map(stat => stat.messages)]
      }];

      return { labels, datasets };
    }
  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.campaignsStats();
  },
  methods: {
    ...mapActions({
      campaignsStats: 'campaigns/campaignsStats'
    })
  }
};
</script>
