<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
// import '@/assets/css/argon.css';
import Connected from '@/components/layouts/Connected';
import Default from '@/components/layouts/Default';
import { mapGetters } from 'vuex';
export default {
  components: {
    Default,
    Connected
  },
  computed: {
    ...mapGetters({
      layout: 'layout/layout'
    })
  }
}
</script>
<style lang="scss">
  
</style>
