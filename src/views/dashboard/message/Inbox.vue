<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="sentMessages">
          <template slot-scope="{ row }">
            <sent-message
              :message="row"
              :show-click-callback="onShow"
            />
          </template>
          <div slot="no-results" class="text-center">Aucun message</div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import SentMessage from '@/components/SentMessage';

export default {
  components: { SentMessage },
  computed: {
    ...mapGetters({
      sentMessages: 'campaigns/sent'
    }),
    isEmpty() {
      return this.sentMessages.length === 0;
    }
  },
  created() {
    this.getCampaigns();
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      columns: [
        { label: 'Nom de la campagne', field: 'name' },
        { label: 'Envoyé le', field: 'sentDate' },
        { label: '', representedAs: () => '' }
      ]
    };
  },
  methods: {
    ...mapActions({
      getCampaigns: 'campaigns/getUserCampaigns'
    }),
    onShow(messageId) {
      this.$router.push({
        name: 'answers',
        params: { messageId }
      });
    }
  }
};
</script>
