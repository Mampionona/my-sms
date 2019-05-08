<template>
  <ul v-if="user" class="navbar-nav align-items-center ml-md-auto">
    <li class="nav-item d-xl-none toggler-link">
      <sidenav-toggler toggler-dark></sidenav-toggler>
    </li>
    <li class="nav-item">
      <a :href="`mailto:${mailTo}`" class="nav-link"><i class="fas fa-question-circle"></i> Assistance</a>
    </li>
    <li v-if="user !== null && user.credits" class="nav-link d-inline-flex align-items-center">
      Crédits <span class="ml-2 badge badge-secondary">{{ user.credits | formatCurrency(2) }} / {{ numberOfSMS | formatNumber }} SMS</span>
    </li>
  </ul>
</template>
<script>
import SidenavToggler from '@/components/SidenavToggler';
import { MAIL_TO } from '@/utils';

export default {
  props: {
    plans: Array,
    user: {
      type: Object
    }
  },
  components: { SidenavToggler },
  computed: {
    mailTo() {
      return MAIL_TO;
    },
    numberOfSMS() {
      const plan = this.getPlan();
      const { credits } = this.user;
      let smsPrice;
      let numberOfSMS;
      if (!plan.length || !credits) return '0';
      smsPrice = plan[0].smsPrice / 1000;
      numberOfSMS = Math.floor(credits / smsPrice);
      return numberOfSMS;
    }
  },
  methods: {
    toggleSidenav() {
      document.body.classList.toggle('g-sidenav-pinned');
    },
    getPlan() {
      return this.plans.filter(({ id }) => id === this.user.planId);
    }
  }
};
</script>
