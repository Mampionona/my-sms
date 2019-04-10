<template>
  <div id="app">
    <component :is="layout">
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
    </component>
  </div>
</template>

<script>
import Connected from '@/components/layouts/Connected';
import Default from '@/components/layouts/Default';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    Default,
    Connected
  },
  watch: {
    '$route': 'updateLayout'
  },
  created () {
    this.updateLayout();
  },
  computed: {
    ...mapGetters({
      layout: 'layout/layout'
    })
  },
  methods: {
    ...mapActions({
      setLayout: 'layout/setLayout'
    }),
    // Update application layout
    updateLayout () {
      this.setLayout(this.$route.meta.layout || 'default');
      if (!this.$route.meta.layout) {
        document.body.classList.add('bg-default');
      } else {
        document.body.classList.remove('bg-default');
      }
    }
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
