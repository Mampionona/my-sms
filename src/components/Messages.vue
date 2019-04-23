<template>
  <v-table>
    <thead class="thead-light">
      <tr v-if="isCampaign">
        <th v-for="(c1, index) in columns.campaign" :key="index">{{ c1 }}</th>
      </tr>
      <tr v-else>
        <th v-for="(c2, index) in columns.message" :key="index">{{ c2 }}</th>
      </tr>
    </thead>
    <tbody class="list">
      <component
        :is="component"
        :click-callback="clickCallback"
        v-for="campaign in messages"
        :campaign="campaign"
        :key="campaign.id"
      />
      <tr v-if="messages.length === 0">
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
import Message from '@/components/Message';
export default {
  components: { vTable, Campaign, Message },
  computed: {
    isCampaign () {
      return this.component === 'campaign';
    },
    colspan () {
      const FOUR_COLUMN = 4;
      const SEVEN_COLUMN = 7;
      return this.isCampaign ? FOUR_COLUMN : SEVEN_COLUMN;
    }
  },
  data () {
    return {
      columns: {
        campaign: ['Message', 'Emetteur', 'Date d\'envoi', 'SMS/Destinataires'],
        message: ['Nom de la campagne', 'Message', 'Emetteur', 'Date d\'envoi', 'SMS', 'Rapport', 'Réponses']
      }
    };
  },
  props: {
    messages: Array,
    clickCallback: Function,
    component: {
      default: 'campaign',
      type: String
    }
  }
}
</script>
