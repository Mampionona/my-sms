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
            <chart :chart-data="dataCollection"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from '@/components/Chart';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { Chart },
  computed: {
    ...mapGetters({
      stats: 'campaigns/stats'
    }),
    dataCollection () {
      const labels = ['', ...this.stats.map(stat => stat.date)];
      const datasets = [
        {
          label: 'Messages',
          data: [0, ...this.stats.map(stat => stat.messages)]
        }
      ];

      return { labels, datasets };
    }
  },
  methods: {
    ...mapActions({
      campaignsStats: 'campaigns/campaignsStats'
    })
  },
  mounted () {
    this.campaignsStats();
  }
}
</script>
