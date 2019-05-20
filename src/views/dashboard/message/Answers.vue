<template>
  <div class="row">
    <div class="col-lg-4 mb-5">
      <div class="phone">
        <div v-if="campaign">
          <div class="message small p-1">
            <vue-custom-scrollbar class="message-scroll-area" :settings="settings">
              {{ campaign.text }}
            </vue-custom-scrollbar>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <datatable :columns="columns" :data="answers">
          <template slot-scope="{ row }">
            <answer :answer="row" @delete-answer="deleteAnswer"></answer>
          </template>
          <div slot="no-results" class="text-center">{{ $t('Aucune réponse') }}</div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Answer from '@/components/Answer';
import vueCustomScrollbar from 'vue-custom-scrollbar';

export default {
  components: { Answer, vueCustomScrollbar },
  computed: {
    ...mapGetters({
      answers: 'campaigns/answers',
      campaigns: 'campaigns/sent'
    })
  },
  created() {
    this.getAnswers(this.$route.params.messageId).catch(error => this.$eventBus.$emit('fetch-data-error', error));
    this.getCampaigns()
      .then((data) => {
        data.forEach((campaign) => {
          if (campaign.id === parseInt(this.$route.params.messageId, 10)) this.campaign = campaign;
        });
      })
      .catch(() => this.$eventBus.$emit('fetch-data-error'));
  },
  data() {
    return {
      settings: { suppressScrollX: true },
      page: 1,
      per_page: 10,
      campaign: null,
      columns: [
        { label: 'Téléphone', field: 'telephone' },
        { label: 'Message', field: 'text' }
      ]
    };
  },
  methods: {
    ...mapActions({
      getAnswers: 'campaigns/campaignAnswers',
      getCampaigns: 'campaigns/getUserCampaigns'
    }),
    deleteAnswer(threadId) {
      const { threads } = this;
      this.threads = threads.filter(thread => thread.id !== threadId);
    }
  }
};
</script>
<style lang="scss">
.message-scroll-area {
  height: 100%;
  margin: auto;
  position: relative;
  width: 100%;
}
</style>
