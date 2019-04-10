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
