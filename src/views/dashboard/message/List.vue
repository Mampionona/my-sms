<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'message.redaction' }">Créer une campaigne</router-link>
        </div>
        <div class="card-body">
          <messages :click-callback="onMessageClick" :messages="sent" component="message">Aucun envois effectués</messages>
        </div>
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
