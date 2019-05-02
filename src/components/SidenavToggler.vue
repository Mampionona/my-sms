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
  data () {
    return {
      isActive: false
    };
  },
  methods: {
    toggleSidenav() {
      toggleClass(document.body, 'g-sidenav-pinned g-sidenav-hidden');
      this.isActive = !this.isActive;
    },
    onWindowResize () {
      if (body.classList.contains('g-sidenav-pinned')) this.isActive = true;
      else this.isActive = false;
    }
  },
  mounted () {
    window.addEventListener('resize', this.onWindowResize);
    if (window.innerWidth > 1200) {
      this.isActive = true;
    }

    document.addEventListener('click', e => {
      if (e.target === body) {
        this.isActive = false;
        body.classList.remove('g-sidenav-pinned');
        body.classList.add('g-sidenav-hidden');
      }
    });
  },
  props: {
    togglerDark: {
      default: false,
      type: Boolean
    }
  }
};
</script>
