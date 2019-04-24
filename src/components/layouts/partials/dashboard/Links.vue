<template>
  <ul v-if="user" class="navbar-nav align-items-center ml-md-auto">
    <li class="nav-item">
      <a :href="`mailto:${mailTo}`" class="nav-link"><i class="fas fa-question-circle"></i> Assistance</a>
    </li>
    <li v-if="user.credits" class="nav-link d-inline-flex align-items-center">
      Credits <span class="ml-2 badge badge-danger">{{ user.credits | formatCurrency }}</span>
    </li>
  </ul>
</template>
<script>
import { MAIL_TO } from '@/utils';
export default {
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    mailTo () {
      return MAIL_TO;
    }
  }
}
</script>
