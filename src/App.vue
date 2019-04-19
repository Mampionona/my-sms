<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    DefaultLayout,
    DashboardLayout
  },
  watch: {
    '$route': 'routeDidChange'
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
      getUser: 'auth/getUser',
      setLayout: 'layout/setLayout'
    }),
    setBodyClass () {
      const body = document.body;
      if (this.$route.meta.layout) {
        body.classList.remove('bg-default');
        return;
      }
      body.classList.add('bg-default');
    },
    routeDidChange () {
      const layout = this.$route.meta.layout || 'default';
      this.setBodyClass();
      this.setLayout(`${layout}-layout`);
      this.$jQuery('.collapse.show.closable').collapse('hide');
    }
  }
}
</script>
<style>
textarea {
  resize: none;
}

.form-control-plaintext {
  outline: 0;
}
</style>

