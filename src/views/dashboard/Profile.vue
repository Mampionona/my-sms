<template>
  <div class="row">
    <div class="col-xl-4 order-xl-2">
      <div v-if="user.credits" class="card bg-gradient-info border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0 text-white">Credits</h5>
              <span class="h2 font-weight-bold mb-0 text-white">{{ user.credits | formatNumber }} SMS</span>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
                <i class="ni ni-credit-card"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card card-profile">
        <div class="card-body">
          <div class="text-center">
            <h5 class="h3">{{ user | fullname }}</h5>
            <div class="h5 font-weight-300 d-flex align-items-center justify-content-center">
              <i class="ni ni-pin-3 mr-2"></i>
              {{ user.street }}
            </div>
            <div class="h5 mt-4">
              <i class="ni ni-building mr-2"></i>
              {{ user.userRole }} - {{ user.company }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-8 order-xl-1">
      <edit-profile :user="user"></edit-profile>
    </div>
  </div>
</template>
<script>
import EditProfile from '@/components/partials/EditProfile';
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
  // Fetch user before navigation
  beforeRouteEnter(to, from, next) {
    store.dispatch('auth/getUser').then(next);
  },
  components: { EditProfile },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  }
};
</script>
