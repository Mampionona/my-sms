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

const body = document.body;

export default {
  components: {
    Default,
    Connected
  },
  watch: {
    '$route': 'routeChanged'
  },
  created () {
    this.routeChanged();
  },
  mounted () {
    this.$nextTick(function () {
      this.getUser();
    });
  },
  computed: {
    ...mapGetters({
      layout: 'layout/layout'
    })
  },
  methods: {
    ...mapActions({
      setLayout: 'layout/setLayout',
      getUser: 'auth/getUser'
    }),
    // Update application layout
    routeChanged () {
      const layout = this.$route.meta.layout;
      this.setLayout(layout || 'default');
      layout ? body.classList.remove('bg-default') : body.classList.add('bg-default');

      this.$jQuery('.collapse.show').collapse('hide');
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
