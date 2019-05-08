<template>
  <div :class="classObject" data-action="sidenav-unpin" data-target="#sidenav-main" @click="toggleSidenav">
    <div class="sidenav-toggler-inner">
      <i class="sidenav-toggler-line"></i>
      <i class="sidenav-toggler-line"></i>
      <i class="sidenav-toggler-line"></i>
    </div>
  </div>
</template>
<script>
import { toggleClass } from '@/utils';

const { body } = document;

export default {
  computed: {
    classObject() {
      return {
        'sidenav-toggler': true,
        'sidenav-toggler-dark': this.togglerDark,
        active: this.isActive
      };
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleSidenav() {
      this.isActive = !this.isActive;
      toggleClass(body, 'sidenav-open');
    }
  },
  props: {
    togglerDark: {
      default: false,
      type: Boolean
    }
  }
};
</script>
