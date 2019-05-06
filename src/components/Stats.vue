<template>
  <div class="chart">
    <line-chart :chart-data="dataCollection" :styles="{height: '100%'}"></line-chart>
  </div>
</template>
<script>
import LineChart from '@/components/LineChart';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    LineChart
  },
  computed: {
    ...mapGetters({
      stats: 'campaigns/stats'
    }),
    dataCollection() {
      const labels = ['', ...this.stats.map(stat => stat.date)];
      const datasets = [{
        label: 'Messages',
        data: [0, ...this.stats.map(stat => stat.messages)],
        backgroundColor: 'transparent'
      }];

      return { labels, datasets };
    }
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    this.campaignsStats();
  },
  methods: {
    ...mapActions({
      campaignsStats: 'campaigns/campaignsStats'
    })
  }
};
</script>
