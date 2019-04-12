<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
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
      if (this.layout != layout) {
        this.setLayout(layout || 'default');
      }
      layout ? body.classList.remove('bg-default') : body.classList.add('bg-default');
      this.$jQuery('.collapse.show').collapse('hide');
    }
  }
}
</script>
