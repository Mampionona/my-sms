<template>
  <div class="chart">
    <line-chart :chart-data="dataCollection" :styles="{ height: '100%' }"></line-chart>
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
      const datasets = [
        {
          label: 'Envoyés',
          data: [0, ...this.stats.map(stat => stat.messages)],
          borderColor: '#b7b7b7',
          backgroundColor: 'transparent'
        },
        {
          label: 'Reçus',
          data: [0, ...this.stats.map(stat => stat.received)],
          borderColor: 'green',
          backgroundColor: 'transparent'
        },
        {
          label: 'Erreurs',
          data: [0, ...this.stats.map(stat => stat.errored)],
          borderColor: 'yellow',
          backgroundColor: 'transparent'
        },
        {
          label: 'STOPs',
          data: [0, ...this.stats.map(stat => stat.stopped)],
          borderColor: 'red',
          backgroundColor: 'transparent'
        }
      ];

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
