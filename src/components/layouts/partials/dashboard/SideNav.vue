<template>
  <nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <vue-custom-scrollbar class="scroll-area" :settings="settings">
      <div class="sidenav-header d-flex align-items-center">
        <router-link :to="{ name: 'dashboard' }" class="navbar-brand">
          <img src="@/assets/images/logo.png" class="navbar-brand-img" alt="...">
        </router-link>
        <div class="ml-auto d-none d-xl-block">
          <sidenav-toggler></sidenav-toggler>
        </div>
      </div>
      <div class="navbar-inner">
        <navbar></navbar>
      </div>
    </vue-custom-scrollbar>
  </nav>
</template>
<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';
import SidenavToggler from '@/components/SidenavToggler';
import Navbar from './Navbar';

export default {
  components: { vueCustomScrollbar, Navbar, SidenavToggler },
  data() {
    return {
      settings: {
        suppressScrollX: true
      }
    };
  }
};
</script>
<style >
.scroll-area {
  height: 100%;
  margin: auto;
  position: relative;
  width: 100%;
}
</style>
