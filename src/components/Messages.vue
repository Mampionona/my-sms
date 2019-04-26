<template>
  <v-table>
    <thead class="thead-light">
      <th v-for="(column, index) in __columns" :key="index">{{ column }}</th>
    </thead>
    <tbody class="list">
      <campaign
        v-for="campaign in messages"
        :key="campaign.id"
        :campaign="campaign"
        :lists="lists"
        :click-callback="clickCallback"
        :is-draft="isDraft"
      />
      <tr v-if="isEmpty">
        <td :colspan="colspan" class="text-sm text-center">
          <slot></slot>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import vTable from '@/components/vTable';
import Campaign from '@/components/Campaign';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: { vTable, Campaign },
  computed: {
    ...mapGetters({
      lists: 'lists/lists'
    }),
    __columns () {
      if (this.isDraft) {
        return this.columns.campaign;
      }
      return this.columns.message;
    },
    isEmpty () {
      return this.messages.length === 0;
    },
    colspan () {
      const FOUR_COLUMN = 4;
      const SEVEN_COLUMN = 7;
      return this.isDraft ? FOUR_COLUMN : SEVEN_COLUMN;
    }
  },
  created () {
    this.getLists();
  },
  data () {
    return {
      columns: {
        campaign: ['Message', 'Emetteur', 'Date d\'envoi', 'SMS/Destinataires'],
        message: ['Nom de la campagne', 'Message', 'Emetteur', 'Date d\'envoi', 'SMS', 'Rapport', 'Réponses']
      }
    };
  },
  methods: {
    ...mapActions({
      getLists: 'lists/getUserLists'
    })
  },
  props: {
    messages: Array,
    clickCallback: Function,
    isDraft: {
      default: false,
      type: Boolean
    }
  }
}
</script>
