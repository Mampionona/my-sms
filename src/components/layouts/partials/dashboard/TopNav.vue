<template>
  <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <links :user="user" :plans="plans"></links>
        <user-info :user="user"></user-info>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import UserInfo from './UserInfo';
import Links from './Links';

export default {
  components: { UserInfo, Links },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      plans: 'plans/plans'
    })
  },
  methods: {
    ...mapActions({ getPlans: 'plans/getPlans' })
  },
  mounted() {
    this.getPlans();
  }
};
</script>
