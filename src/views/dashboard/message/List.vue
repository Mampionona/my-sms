<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'create_campaign' }">{{ $t('Créer une campagne') }}</router-link>
        </div>
        <messages :is-fetching="isFetching" @show="onShow" :messages="sent">{{ $t('Aucun envois effectués') }}</messages>
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
      sent: 'campaigns/sent',
      isFetching: 'campaigns/isFetching'
    })
  },
  methods: {
    ...mapActions({
      getCampaigns: 'campaigns/getUserCampaigns'
    }),
    onShow({ id }) {
      this.$router.push({ name: 'report', params: { campaignId: id } });
    }
  },
  mounted() {
    this.getCampaigns().catch(() => this.$eventBus.$emit('fetch-data-error'));
  }
};
</script>
