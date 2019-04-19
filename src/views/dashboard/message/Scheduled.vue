<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'message.redaction' }">Créer une campaigne</router-link>
        </div>
        <messages :click-callback="onMessageClick" :messages="scheduled" component="message">Aucun envois planifiés</messages>
      </div>
    </div>
  </div>
</template>
<script>
import Messages from '@/components/Messages';
import { mapActions, mapGetters } from 'vuex';
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
    onMessageClick () {
      // console.log(message);
    }
  },
  mounted () {
    this.getUserCampaigns();
  }
}
</script>
