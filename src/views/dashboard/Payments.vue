<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="items">
          <template slot-scope="{ row }">
            <payment :data="row"></payment>
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
              {{ $t('Aucun paiement effectué') }}
            </template>
          </div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import Payment from '@/components/Payment';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Payment },
  computed: {
    ...mapGetters({
      items: 'payment/payments',
      isFetching: 'payment/isFetching'
    }),
    columns() {
      return ['Nom', 'Prénom', 'Société', 'E-mail', 'Montant', 'Date'].map(name => this.$t(name));
    }
  },
  data() {
    return {
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
