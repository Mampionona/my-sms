<template>
  <ul class="navbar-nav align-items-center ml-auto ml-md-0" v-if="user">
    <li class="nav-item dropdown">
      <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div class="media align-items-center">
          <span class="avatar avatar-sm rounded-circle">
            <img alt="Image placeholder" src="@/assets/images/team-4.jpg">
          </span>
          <div class="media-body ml-2 d-none d-lg-block">
            <span class="mb-0 text-sm  font-weight-bold">{{ user.firstname }}</span>
          </div>
        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="dropdown-header noti-title">
          <h6 class="text-overflow m-0">Welcome!</h6>
        </div>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-single-02"></i>
          <span>My profile</span>
        </a>
        <!-- <a href="#!" class="dropdown-item">
          <i class="ni ni-settings-gear-65"></i>
          <span>Settings</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-calendar-grid-58"></i>
          <span>Activity</span>
        </a>
        <a href="#!" class="dropdown-item">
          <i class="ni ni-support-16"></i>
          <span>Support</span>
        </a> -->
        <div class="dropdown-divider"></div>
        <a href="#!" class="dropdown-item" @click.prevent="logout">
          <i class="ni ni-user-run"></i>
          <span>Déconnexion</span>
        </a>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    ...mapActions({
      logoutUser: 'auth/logout'
    }),
    logout () {
      localStorage.removeItem('token');
      this.logoutUser();
      if ('Authorization' in window.axios.defaults.headers.common) {
        delete window.axios.defaults.headers.common.Authorization;
      }
      this.$router.push({ name: 'login' });
    }
  }
}
</script>
