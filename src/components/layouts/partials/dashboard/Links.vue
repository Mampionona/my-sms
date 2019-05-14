<template>
  <ul v-if="user" class="navbar-nav align-items-center ml-md-auto">
    <li class="nav-item d-xl-none toggler-link">
      <sidenav-toggler toggler-dark></sidenav-toggler>
    </li>
    <li class="nav-item ml-2">
      <a :href="`tel:${telephone}`" class="nav-link"><i class="fas fa-phone fa-flip-horizontal"></i> <span class="d-none d-lg-inline ml-2">{{ telephone }}</span></a>
    </li>
    <li class="nav-item">
      <a :href="`mailto:${mailTo}`" class="nav-link"><i class="fas fa-question-circle"></i> <span class="d-none d-lg-inline ml-2">Assistance par email</span></a>
    </li>
    <li v-if="user !== null && user.credits" class="nav-link d-inline-flex align-items-center">
      <span class="d-none d-lg-inline">Crédits</span> <span class="ml-2 badge badge-secondary">{{ user.credits | formatNumber }} SMS</span>
    </li>
  </ul>
</template>
<script>
import SidenavToggler from '@/components/SidenavToggler';
import { MAIL_TO, TELEPHONE } from '@/utils';

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
    telephone() {
      return TELEPHONE;
    }
  }
};
</script>
