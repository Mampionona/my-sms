<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'message.redaction' }">Créer une campagne</router-link>
        </div>
        <messages :click-callback="onClickCallback" :messages="drafts" is-draft>Aucun brouillons</messages>
      </div>
    </div>
  </div>
</template>
<script>
import Messages from '@/components/Messages';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { Messages },
  mounted () {
    this.getUserCampaigns();
  },
  computed: {
    ...mapGetters({
      drafts: 'campaigns/drafts'
    })
  },
  methods: {
    ...mapActions({
      getUserCampaigns: 'campaigns/getUserCampaigns'
    }),
    onClickCallback ({ id }) {
      this.$router.push({
        name: 'message.redaction',
        query: { campaign_id: id }
      });
    }
  }
}
</script>
