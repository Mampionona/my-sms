<template>
  <div>
    <datatable :columns="columns" :data="messages">
      <template slot-scope="{ row }">
        <campaign
          :key="row.id"
          :campaign="row"
          :lists="lists"
          @show="onShow"
          :is-draft="isDraft"
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
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Campaign from '@/components/Campaign';

export default {
  components: { Campaign },
  computed: {
    ...mapGetters({
      lists: 'lists/lists'
    }),
    columns() {
      if (this.isDraft) {
        return this.columnsName.campaign;
      }
      return this.columnsName.message;
    },
    isEmpty() {
      return this.messages.length === 0;
    },
    colspan() {
      const FOUR_COLUMN = 4;
      const SEVEN_COLUMN = 7;
      return this.isDraft ? FOUR_COLUMN : SEVEN_COLUMN;
    }
  },
  mounted() {
    this.getLists();
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      columnsName: {
        campaign: [
          { label: 'Message', field: 'text' },
          { label: 'Emetteur', field: 'senderName' },
          { label: 'Date d\'envoi', field: 'sendDate' },
          { label: 'SMS/Destinataires', representedAs: () => '' }
        ],
        message: [
          { label: 'Nom de la campagne', field: 'name' },
          { label: 'Message', field: 'text' },
          { label: 'Emetteur', field: 'senderName' },
          { label: 'Date d\'envoi', field: 'sentDate' },
          { label: 'SMS', representedAs: () => '' },
          { label: 'Rapport', representedAs: () => '' }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      getLists: 'lists/getUserLists'
    }),
    onShow(campaign) {
      this.$emit('show', campaign);
    }
  },
  props: {
    messages: Array,
    isDraft: {
      default: false,
      type: Boolean
    },
    isFetching: {
      default: false,
      type: Boolean
    }
  }
};
</script>
