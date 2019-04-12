<template>
  <ul v-if="user" class="navbar-nav align-items-center ml-md-auto">
    <li class="nav-item">
      <a href="#" class="nav-link"><i class="fas fa-code"></i> API SMS</a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link"><i class="fas fa-question-circle"></i> Assistance</a>
    </li>
    <li v-if="user.credits" class="nav-item">
      <a href="#" class="nav-link">Balance <span class="badge badge-danger">{{ user.credits | formatCurrency }}</span></a>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>
