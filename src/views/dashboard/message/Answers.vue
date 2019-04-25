<template>
  <div class="row">
    <div class="col-lg-4">

    </div>
    <div class="col-lg-8">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <th>Téléphone</th>
            <th>Texte</th>
            <!-- <th>Réçu le</th> -->
            <th></th>
          </thead>
          <tbody class="list">
            <answer v-for="answer in answers" :key="answer.id" :thread="answer" :click-callback="onClick"></answer>
            <tr v-if="answers.length === 0">
              <td colspan="4" class="text-center text-sm">Aucune réponse</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import Answer from '@/components/Answer';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: { vTable, Answer },
  computed: {
    ...mapGetters({
      answers: 'campaigns/answers'
    })
  },
  created () {
    this.getAnswers(this.$route.params.messageId);
  },
  methods: {
    ...mapActions({
      getAnswers: 'campaigns/campaignAnswers'
    }),
    onClick (threadId) {
      const threads = this.threads;
      this.threads = threads.filter(thread => thread.id !== threadId);
    }
  }
}
</script>
