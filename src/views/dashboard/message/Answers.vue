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
            <answer :answer="row" @delete-answer="showConfirmModal"></answer>
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
              {{ $t('Aucune réponse') }}
            </template>
          </div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
      <modal
        id="confirm-message-delete"
        accept-button
        :accept-button-label="`${$t('Supprimer')}`"
        cancel-button
        :cancel-button-label="`${$t('Non')}`"
        @accept="deleteAnswer(answerId)"
      >
        <p>Etes-vous certain d'effacer ce message ?</p>
      </modal>
    </div>
  </div>
</template>
<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Answer from '@/components/Answer';
import Modal from '@/components/Modal';

export default {
  components: { Answer, vueCustomScrollbar, Modal },
  computed: {
    ...mapGetters({
      answers: 'campaigns/answers',
      campaigns: 'campaigns/sent',
      isFetching: 'campaigns/isFetching'
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
        { label: 'Message', field: 'text' },
        { label: '' }
      ],
      answerId: null
    };
  },
  methods: {
    ...mapActions({
      getAnswers: 'campaigns/campaignAnswers',
      getCampaigns: 'campaigns/getUserCampaigns',
      deleteAnAnswer: 'campaigns/deleteAnAnswer'
    }),
    ...mapMutations({
      updateAnswers: 'campaigns/UPDATE_ANSWERS'
    }),
    deleteAnswer(answerId) {
      this.deleteAnAnswer({
        campaignId: this.$route.params.messageId,
        answerId
      })
        .then(() => this.updateAnswers(this.answers.filter(answer => answer.id !== answerId)))
        .catch(error => this.$eventBus.$emit('fetch-data-error', error))
        .finally(() => this.$jQuery('#confirm-message-delete').modal('hide'));
    },
    showConfirmModal(answerId) {
      this.answerId = answerId;
      this.$jQuery('#confirm-message-delete').modal('show');
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
