<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <th class="w-50">Téléphone</th>
            <th>Envoyé le</th>
            <th></th>
          </thead>
          <tbody class="list">
            <sent-message
              v-for="message in sentMessages"
              :key="message.id"
              :message="message"
              :show-click-callback="onShow"
            />
            <tr v-if="isEmpty">
              <td colspan="3" class="text-center text-sm">Aucune campagne expédiée</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import vTable from '@/components/vTable';
import SentMessage from '@/components/SentMessage';

export default {
  components: { vTable, SentMessage },
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
