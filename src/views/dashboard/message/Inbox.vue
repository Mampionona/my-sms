<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <th>Téléphone</th>
            <th>Réponses</th>
            <th>Envoyé le</th>
            <th></th>
          </thead>
          <tbody class="list">
            <sent-message
              v-for="message in messages"
              :key="message.id"
              :message="message"
              :delete-click-callback="onDelete"
              :show-click-callback="onShow"
            />
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import SentMessage from '@/components/SentMessage';
export default {
  components: { vTable, SentMessage },
  data () {
    return {
      messages: [
        {
          "id": 1,
          "text": "Bonjour",
          "date": "2022-10-21T01:24:15.000Z"
        }
      ]
    };
  },
  methods: {
    onDelete (messageId) {
      alert(messageId);
    },
    onShow (messageId) {
      this.$router.push({
        name: 'replies',
        params: { messageId }
      });
    }
  }
}
</script>
