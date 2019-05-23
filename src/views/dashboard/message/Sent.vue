<template>
  <div class="row">
    <div class="col-lg-4"></div>
    <div class="col-lg-8">
      <div class="card">
        <datatable :columns="columns" :data="getData" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <report :message="row"></report>
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
              {{ $t('Aucun message envoyé') }}
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
import Report from './Report';

export default {
  components: { Report },
  computed: {
    ...mapGetters({ isFetching: 'campaigns/isFetching' }),
    columns() {
      return ['Téléphone', 'Statut d\'envoi', 'SMS'].map(label => ({ label }));
    }
  },
  data() {
    return {
      page: 1,
      per_page: 10
    };
  },
  methods: {
    ...mapActions({ getSentMessages: 'campaigns/getSentMessages' }),
    getData(params, setRowData) {
      this.getSentMessages({ campaignId: this.$route.params.campaignId, page: params.page_number })
        .then(({ messages, messageNumber }) => setRowData(messages, messageNumber))
        .catch(error => this.$eventBus.$emit('fetch-data-error', error));
    }
  }
};
</script>
