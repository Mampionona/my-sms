<template>
  <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
      <li
        v-for="(link, index) in $breadcrumbs"
        :key="index"
        :class="{'breadcrumb-item': true, 'active': isLast(index)}"
        :aria-current="isLast(index) ? 'page' : ''"
      >
        <router-link v-if="isFirst(index)" :to="link.path"><i :class="icon"></i></router-link>
        <template v-else-if="isLast(index)">{{ pageTitle(link.meta.breadcrumb) }}</template>
        <router-link v-else :to="link.path">
          {{ link.meta.breadcrumb }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ paymentStatus: 'payment/paymentStatus' }),
    icon() {
      return this.$route.meta.icon || 'd-none';
    }
  },
  methods: {
    isFirst(index) {
      return index === 0;
    },
    isLast(index) {
      return index === (this.$breadcrumbs.length - 1);
    },
    pageTitle(title) {
      if (this.$route.name === 'payment_result' && this.paymentStatus) {
        const { paymentStatus: { paymentStatus } } = this;
        if (paymentStatus === 'failure') return 'Le paiement a échoué';
        if (paymentStatus === 'success') return 'Paiement effectué avec succès';
        return title;
      }
      return title;
    }
  }
};
</script>
