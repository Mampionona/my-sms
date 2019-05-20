<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'create_campaign' }">{{ $t('Créer une campagne') }}</router-link>
        </div>
        <messages :is-fetching="isFetching" :messages="scheduled" component="message">{{ $t('Aucun envois planifiés') }}</messages>
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
      scheduled: 'campaigns/scheduled',
      isFetching: 'campaigns/isFetching'
    })
  },
  methods: {
    ...mapActions({ getUserCampaigns: 'campaigns/getUserCampaigns' })
  },
  mounted() {
    this.getUserCampaigns().catch(() => this.$eventBus.$emit('fetch-data-error'));
  }
};
</script>
