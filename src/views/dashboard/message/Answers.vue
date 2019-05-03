<template>
  <div class="row">
    <div class="col-lg-4">

    </div>
    <div class="col-lg-8">
      <div class="card">
        <datatable :columns="columns" :data="answers">
          <template slot-scope="{ row }">
            <answer :answer="row" :click-callback="onClick"></answer>
          </template>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Answer from '@/components/Answer';

export default {
  components: { Answer },
  computed: {
    ...mapGetters({
      answers: 'campaigns/answers'
    })
  },
  created() {
    this.getAnswers(this.$route.params.messageId);
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      columns: [
        { label: 'Téléphone', field: 'telephone' },
        { label: 'Message', field: 'text' }
      ]
    };
  },
  methods: {
    ...mapActions({
      getAnswers: 'campaigns/campaignAnswers'
    }),
    onClick(threadId) {
      const { threads } = this;
      this.threads = threads.filter(thread => thread.id !== threadId);
    }
  }
};
</script>
