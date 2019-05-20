<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="sentMessages" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <sent-message
              :message="row"
              @show="onShow"
            />
          </template>
          <div slot="no-results" class="text-center">
            <template v-if="isFetching">
              <loading-progress
                indeterminate
                hide-background
                size="28"
                rotate
                fillDuration="2"
                rotationDuration="1"
              />
            </template>
            <template v-else>
              {{ $t('Aucun message') }}
            </template>
          </div>
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
      sentMessages: 'campaigns/sent',
      isFetching: 'campaigns/isFetching'
    }),
    isEmpty() {
      return this.sentMessages.length === 0;
    }
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
  },
  mounted() {
    this.getCampaigns().catch(() => this.$eventBus.$emit('fetch-data-error'));
  }
};
</script>
