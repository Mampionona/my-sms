<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'create_campaign' }">Créer une campagne</router-link>
        </div>
        <messages :click-callback="onMessageClick" :messages="scheduled" component="message">Aucun envois planifiés</messages>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Messages from '@/components/Messages';

export default {
  components: { Messages },
  computed: {
    ...mapGetters({
      scheduled: 'campaigns/scheduled'
    })
  },
  methods: {
    ...mapActions({
      getUserCampaigns: 'campaigns/getUserCampaigns'
    }),
    onMessageClick() {
      // console.log(message);
    }
  },
  mounted() {
    this.getUserCampaigns();
  }
};
</script>
