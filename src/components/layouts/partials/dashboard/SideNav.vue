<template>
  <nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main" @mouseover="onMouseover" @mouseleave="onMouseleave">
    <vue-custom-scrollbar class="scroll-area" :settings="settings">
      <div class="sidenav-header d-flex align-items-center">
        <router-link :to="{ name: 'dashboard.index' }" class="navbar-brand">
          <img src="@/assets/blue.png" class="navbar-brand-img" alt="...">
        </router-link>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div class="sidenav-toggler d-none d-xl-block active" data-action="sidenav-unpin" data-target="#sidenav-main" @click="toggleSidenav">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-inner">
        
      </div>
    </vue-custom-scrollbar>
  </nav>
</template>
<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';
export default {
  components: {
    vueCustomScrollbar
  },
  data () {
    return {
      settings: {
        suppressScrollX: true
      }
    }
  },
  methods: {
    onMouseover () {
      document.body.classList.remove('g-sidenav-hidden');
      document.body.classList.add('g-sidenav-show');
    },
    onMouseleave () {
      document.body.classList.remove('g-sidenav-show');
      document.body.classList.add('g-sidenav-hidden');
    },
    toggleSidenav () {
      document.body.classList.toggle('g-sidenav-pinned');
    }
  }
}
</script>
<style >
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>
