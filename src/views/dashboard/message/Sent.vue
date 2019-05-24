<template>
  <div class="row">
    <div class="col-lg-4">
      <div v-if="campaign" class="card">
        <div class="card-header">{{ $t(title) }}</div>
        <div class="card-body">
          <div class="sender mb-4">
            <p class="text-center">
              <small>Emetteur</small><br>
              {{ campaign.senderName }}
            </p>
          </div>
          <div class="recipients mb-4">
            <p class="text-center">
              <small>Destinataires</small><br>
              {{ contacts | formatNumber }}
            </p>
          </div>
          <div class="message text-sm bg-secondary p-3 rounded">{{ campaign.text }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <div class="p-3">
          <div class="dropdown">
            <button type="button" id="export" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-secondary dropdown-toggle">
              <i class="fas fa-download"></i>
            </button>
            <div aria-labelledby="export" class="dropdown-menu">
              <a href="#" class="dropdown-item" @click.prevent="exportCSV">Export CSV</a>
            </div>
          </div>
        </div>
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
import { arrayToCSV } from '@/utils';

export default {
  components: { Report },
  computed: {
    ...mapGetters({
      isFetching: 'campaigns/isFetching',
      sentMessages: 'campaigns/sent'
    }),
    columns() {
      return ['Téléphone', 'Statut d\'envoi', 'SMS'].map(label => ({ label }));
    },
    title() {
      if (!this.campaign) return '';
      return this.campaign.sendDate ? 'Envoi programmé' : 'Envoi immédiat';
    }
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      campaign: null,
      contacts: 0,
      messageNumber: 0
    };
  },
  methods: {
    ...mapActions({
      getSentMessages: 'campaigns/getSentMessages',
      getCampaigns: 'campaigns/getUserCampaigns',
      getLists: 'lists/getUserLists'
    }),
    getData(params, setRowData) {
      this.getSentMessages({ campaignId: this.$route.params.campaignId, page: params.page_number })
        .then(({ messages, messageNumber }) => {
          setRowData(messages, messageNumber);
          this.messageNumber = messageNumber;
        })
        .catch(error => this.$eventBus.$emit('fetch-data-error', error));
    },
    exportCSV() {
      const { messageNumber, per_page: perPage } = this;
      const { campaignId } = this.$route.params;
      const { name } = this.campaign;
      const pageNumber = Math.ceil(messageNumber / perPage);
      let initialCounter = 0;
      let exportMessages = [];

      const getAllSentMessages = (counter) => {
        this.getSentMessages({ campaignId, page: (counter + 1) }).then(({ messages }) => {
          initialCounter++;
          exportMessages = [...exportMessages, ...messages];
          if (initialCounter < pageNumber) getAllSentMessages(initialCounter);
          if (initialCounter === pageNumber) arrayToCSV(exportMessages, name);
        });
      };

      getAllSentMessages(initialCounter);
    }
  },
  mounted() {
    const { campaignId } = this.$route.params;
    this.getCampaigns().then((campaigns) => {
      campaigns.forEach((campaign) => {
        if (campaign.id === parseInt(campaignId, 10)) {
          this.campaign = campaign;
          this.getLists()
            .then(lists => lists.forEach(({ id, contacts }) => {
              if (campaign.list_id === id) {
                this.contacts = contacts;
              }
            }));
        }
      });
    });
  }
};
</script>
