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
            <th>Réçu le</th>
            <th></th>
          </thead>
          <tbody class="list">
            <thread v-for="thread in threads" :key="thread.id" :thread="thread" :click-callback="onClick"></thread>
            <tr v-if="threads.length === 0">
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
import Thread from '@/components/Thread';
export default {
  components: { vTable, Thread },
  data () {
    return {
      threads: [
        {
          id: 1,
          telephone: '+33665651311',
          text: 'Je suis sur Paris. Vous pouvez m\'oter de vos contacts. Merci',
          date: '2022-10-21T01:24:15.000Z'
        },
        {
          id: 2,
          telephone: '+33665051311',
          text: 'Bonjour',
          date: '2022-10-21T08:10:15.000Z'
        },
        {
          id: 3,
          telephone: '+33665751311',
          text: 'C\'est noté',
          date: '2022-10-21T03:39:15.000Z'
        },
      ]
    }
  },
  methods: {
    onClick (threadId) {
      const threads = this.threads;
      this.threads = threads.filter(thread => thread.id !== threadId);
    }
  }
}
</script>
