<template>
  <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <links :user="user"></links>
        <user-info :user="user"></user-info>
      </div>
    </div>
  </nav>
</template>
<script>
import UserInfo from './UserInfo';
import Links from './Links';
import { mapGetters } from 'vuex';

export default {
  components: { UserInfo, Links },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
}
</script>
