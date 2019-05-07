<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Dernier envoi</h5>
            </div>
            <div class="card-body text-center">
              <template v-if="sentMessage">
                <pie-chart :chart-data="collection"></pie-chart>
                <p class="mb-0 mt-4">
                  <router-link class="btn btn-icon btn-info" :to="responseUrl(sentMessage)">
                    <span class="btn-inner--icon"><i class="fas fa-bars"></i></span>
                    <span class="btn-inner--text">Réponses</span>
                  </router-link>
                </p>
              </template>
              <template v-else>
                <p class="mb-0">Aucun message envoyé</p>
              </template>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Prochaine campagne</h5>
            </div>
            <div class="card-body">
              <div class="text-right mt-4">
                <router-link class="btn btn-icon btn-info" :to="{name: 'create_campaign'}">
                  <span class="btn-inner--icon"><i class="fas fa-envelope-open"></i></span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Statistiques des envois</h5>
            </div>
            <div class="card-body">
              <stats></stats>
              <div class="text-right mt-4">
                <router-link class="btn btn-icon btn-info" :to="{name: 'stats'}">
                  <span class="btn-inner--icon"><i class="fas fa-chart-bar"></i></span>
                    <span class="btn-inner--text">Voir les statistiques</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Stats from '@/components/Stats';
import PieChart from '@/components/PieChart';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Stats, PieChart },
  computed: {
    ...mapGetters({
      sentMessage: 'campaigns/lastSent'
    }),
    collection() {
      const items = [
        { label: 'Messages', field: 'messages', color: '#2ca02c' },
        { label: 'Erreur réseau', field: 'net_err', color: '#fe7f0e' },
        { label: 'En attente', field: 'waiting', color: '#2ca02c' },
        { label: 'NPAI', field: 'npai', color: '#4b4d5c' },
        { label: 'Expiré', field: 'expired', color: '#fea730' },
        { label: 'Délivré', field: 'received', color: '#1f77b4' }
      ];
      const labels = [];
      const data = [];
      const backgroundColor = [];
      items.forEach(({ label, field, color }) => {
        labels.push(label);
        data.push(this.sentMessage[field]);
        backgroundColor.push(color);
      });
      return {
        labels,
        datasets: [
          { data, backgroundColor }
        ]
      };
    }
  },
  methods: {
    ...mapActions({
      getCampaigns: 'campaigns/getUserCampaigns'
    }),
    responseUrl({ id }) {
      return {
        name: 'answers',
        params: { messageId: id }
      };
    }
  },
  mounted() {
    this.getCampaigns();
  }
};
</script>
