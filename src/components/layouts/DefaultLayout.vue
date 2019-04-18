<template>
  <div class="default-layout">
    <app-header></app-header>
    <div class="main-content">
      <transition name="slide-fade" mode="out-in">
        <slot></slot>
      </transition>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './partials/Header';
import Footer from './partials/Footer';
export default {
  components: {
    AppHeader: Header,
    AppFooter: Footer
  }
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
