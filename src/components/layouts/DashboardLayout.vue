<template>
  <div>
    <side-nav></side-nav>
    <div class="main-content" id="panel">
      <top-nav></top-nav>
      <profile-header :user="user" v-if="$route.name === 'profile'"></profile-header>
      <div v-else class="header bg-primary pb-6">
        <div class="container-fluid">
          <div class="header-body">
            <div class="row align-items-center py-4">
              <div class="col-lg-6 col-7">
                <h6 class="h2 text-white d-inline-block mb-0">{{ metaTitle | limit(20) }}</h6>
                <breadcrumb></breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mt--6">
        <transition name="slide-fade" mode="out-in">
          <slot></slot>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import SideNav from './partials/dashboard/SideNav.vue';
import TopNav from './partials/dashboard/TopNav.vue';
import Breadcrumb from './partials/dashboard/Breadcrumb';
import ProfileHeader from '@/components/partials/ProfileHeader';
import { mapGetters } from 'vuex';

export default {
  components: { SideNav, TopNav, Breadcrumb, ProfileHeader },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    metaTitle () {
      return this.$route.meta.title || '';
    }
  }
}
</script>
<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
