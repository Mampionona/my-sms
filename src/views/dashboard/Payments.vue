<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="items">
          <template slot-scope="{ row }">
            <payment :data="row"></payment>
          </template>
          <div slot="no-results" class="text-center">{{ $t('Aucun paiement effectué') }}</div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import Payment from '@/components/Payment';
import { mapGetters, mapActions } from 'vuex';

const columns = ['Nom', 'Prénom', 'Société', 'E-mail', 'Montant', 'Date'].map(name => this.$t(name));

export default {
  components: { Payment },
  computed: {
    ...mapGetters({ items: 'payment/payments' })
  },
  data() {
    return {
      columns: columns.map(label => ({ label })),
      page: 1,
      per_page: 10
    };
  },
  methods: {
    ...mapActions({ getPayments: 'payment/getPaymentsLists' })
  },
  mounted() {
    this.getPayments();
  }
};
</script>
