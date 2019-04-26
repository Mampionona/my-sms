<template>
  <nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white" id="sidenav-main" @mouseover="onMouseover" @mouseleave="onMouseleave">
    <vue-custom-scrollbar class="scroll-area" :settings="settings">
      <div class="sidenav-header d-flex align-items-center">
        <router-link :to="{ name: 'dashboard.index' }" class="navbar-brand">
          <img src="@/assets/images/logo.png" class="navbar-brand-img" alt="...">
        </router-link>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div :class="classObject" data-action="sidenav-unpin" data-target="#sidenav-main" @click="toggleSidenav">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </div>
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
import Navbar from './Navbar';

const { classList } = document.body;

export default {
  components: { vueCustomScrollbar, Navbar },
  data() {
    return {
      isActive: true,
      settings: {
        suppressScrollX: true
      }
    };
  },
  mounted() {
    classList.add('g-sidenav-show', 'g-sidenav-pinned');
  },
  computed: {
    classObject() {
      return {
        'sidenav-toggler': true,
        'd-none': true,
        'd-xl-block': true,
        active: this.isActive
      };
    }
  },
  methods: {
    onMouseover() {
      if (!classList.contains('g-sidenav-pinned')) {
        classList.add('g-sidenav-show');
      }
    },
    onMouseleave() {
      if (!classList.contains('g-sidenav-pinned')) {
        classList.remove('g-sidenav-show');
        classList.add('g-sidenav-hidden');
      }
    },
    toggleSidenav() {
      classList.toggle('g-sidenav-pinned');
      this.isActive = !this.isActive;
    }
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
