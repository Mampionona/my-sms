<template>
  <div class="row">
    <div class="col-xl-4 order-xl-2">
      
    </div>
    <div class="col-xl-8 order-xl-1">
      <div class="row">
        <div class="col-lg-6">
          <div v-if="user.credits" class="card bg-gradient-info border-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">Credits</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">{{ user.credits | formatCurrency }}</span>
                </div>
                <div class="col-auto">
                  <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
                    <i class="ni ni-credit-card"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  beforeRouteEnter (to, from, next) {
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
