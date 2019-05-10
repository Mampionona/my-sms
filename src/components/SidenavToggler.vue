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
      isActive: true
    };
  },
  methods: {
    toggleSidenav() {
      this.isActive = !this.isActive;
      toggleClass(body, 'sidenav-open sidenav-close');
    }
  },
  mounted() {
    if (window.innerWidth < 1200) {
      body.classList.add('sidenav-close');
      this.isActive = false;
    }
    else body.classList.add('sidenav-open');
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BODY') {
        this.isActive = false;
        toggleClass(body, 'sidenav-open sidenav-close');
      }
    });
  },
  props: {
    togglerDark: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    $route() {
      if (window.innerWidth > 1200) return;
      body.classList.remove('sidenav-open');
      body.classList.add('sidenav-close');
    }
  }
};
</script>
