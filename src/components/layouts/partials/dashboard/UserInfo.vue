<template>
  <ul class="navbar-nav align-items-center ml-auto ml-md-0" v-if="user">
    <li class="nav-item dropdown">
      <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div class="media align-items-center">
          <i class="ni ni-settings-gear-65"></i>
          <div class="media-body ml-2 d-none d-lg-block">
            <span class="mb-0 text-sm  font-weight-bold">{{ user | fullname | limit(20) }}</span>
          </div>
        </div>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="dropdown-header noti-title">
          <h6 class="text-overflow m-0">Bienvenue!</h6>
        </div>
        <router-link :to="{ name: 'profile' }" class="dropdown-item">
          <i class="ni ni-single-02"></i>
          <span>Mon compte</span>
        </router-link>
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
import Axios from 'axios';
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
    logout() {
      this.logoutUser();
      if ('Authorization' in Axios.defaults.headers.common) {
        delete Axios.defaults.headers.common.Authorization;
      }
      this.$router.push({ name: 'login' });
    }
  }
};
</script>
