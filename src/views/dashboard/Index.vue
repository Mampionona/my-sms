<template>
  <div class="row">
    <div class="col">
      <div class="row mb-5">
        <div class="col-lg-4">
          <link-with-icon :to="{ name: 'packs' }" icon="ni ni-credit-card">Acheter un pack</link-with-icon>
        </div>
        <div class="col-lg-4 mt-4 mt-lg-0">
          <link-with-icon :to="{ name: 'import_file' }" icon="fas fa-address-book">Importer des contacts</link-with-icon>
        </div>
        <div class="col-lg-4 mt-4 mt-lg-0">
          <link-with-icon :to="{ name: 'create_campaign' }" icon="fa fa-th-large">Créer une campagne</link-with-icon>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Dernier envoi</h5>
            </div>
            <div class="card-body text-center">
              <template v-if="lastSentMessage">
                <pie-chart :chart-data="collection"></pie-chart>
                <p class="mb-0 mt-4">
                  <router-link class="btn btn-icon btn-primary" :to="responseUrl(lastSentMessage)">
                    <span class="btn-inner--icon"><i class="fas fa-bars"></i></span>
                    <span class="btn-inner--text">Réponses</span>
                  </router-link>
                </p>
              </template>
              <template v-else>
                <p class="mb-0">Vous n'avez aucun envoi effectué</p>
              </template>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Prochaine campagne</h5>
            </div>
            <div class="card-body text-center">
              <div v-if="nextScheduledMessage">
                <p class="mb-0">La prochaine campagne sera envoyée le {{ nextScheduledMessage.sendDate | full }}</p>
              </div>
              <p v-else class="mb-0">Vous n'avez aucun envoi programmé.</p>
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
                <router-link class="btn btn-icon btn-primary" :to="{name: 'stats'}">
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
import LinkWithIcon from '@/components/LinkWithIcon';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Stats, PieChart, LinkWithIcon },
  computed: {
    ...mapGetters({
      lastSentMessage: 'campaigns/lastSentMessage',
      nextScheduledMessage: 'campaigns/nextScheduledMessage'
    }),
    collection() {
      const items = [
        { label: 'Messages', field: 'messages', color: '#2ca02c' },
        { label: 'Erreur', field: 'errored', color: '#fe7f0e' },
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
        data.push(this.lastSentMessage[field]);
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
