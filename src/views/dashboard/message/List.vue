<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'message.redaction' }">Créer une campagne</router-link>
        </div>
        <messages :click-callback="onMessageClick" :messages="sent" component="message">Aucun envois effectués</messages>
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
      sent: 'campaigns/sent'
    })
  },
  methods: {
    ...mapActions({
      getCampaigns: 'campaigns/getUserCampaigns'
    }),
    onMessageClick () {
      // console.log(message);
    }
  },
  mounted () {
    this.getCampaigns();
  }
}
</script>
