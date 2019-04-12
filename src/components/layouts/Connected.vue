<template>
  <div>
    <side-nav></side-nav>
    <div class="main-content" id="panel">
      <top-nav></top-nav>
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

export default {
  components: { SideNav, TopNav }
}
</script>
<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
