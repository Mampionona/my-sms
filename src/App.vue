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

const body = document.body;

export default {
  components: {
    DefaultLayout,
    DashboardLayout
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
    ...mapActions({ getUser: 'auth/getUser' }),
    routeChanged () {
      this.$route.meta.layout ? body.classList.remove('bg-default') : body.classList.add('bg-default');
      // this.$jQuery('.collapse.show').collapse('hide');
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

