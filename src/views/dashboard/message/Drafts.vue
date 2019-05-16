<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-primary" :to="{ name: 'create_campaign' }">{{ $t('Créer une campagne') }}</router-link>
        </div>
        <messages @show="onShow" :messages="drafts" is-draft>{{ $t('Aucun brouillons') }}</messages>
      </div>
    </div>
  </div>
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import Messages from '@/components/Messages';

export default {
  components: { Messages },
  mounted() {
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
    onShow({ id }) {
      this.$router.push({
        name: 'create_campaign',
        query: { campaign_id: id }
      });
    }
  }
};
</script>
