<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <fetch-data-error></fetch-data-error>
  </div>
</template>

<script>
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { mapGetters, mapActions } from 'vuex';
import { UNAUTHENTICATED } from '@/utils';
import FetchDataError from '@/components/FetchDataError';

export default {
  components: {
    DefaultLayout,
    DashboardLayout,
    FetchDataError
  },
  watch: {
    $route: 'routeDidChange'
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isLoggedIn) {
        this.getUser().catch((error) => {
          if (!error) return;
          const { status } = error;
          if (status === UNAUTHENTICATED) this.$router.push({ name: 'login' });
        });
      }
    });
  },
  computed: {
    ...mapGetters({
      layout: 'layout/layout',
      isLoggedIn: 'auth/isLoggedIn'
    })
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser',
      setLayout: 'layout/setLayout'
    }),
    setBodyClass() {
      const { body } = document;
      if (this.$route.meta.layout) {
        body.classList.remove('bg-default');
        return;
      }
      body.classList.add('bg-default');
    },
    routeDidChange() {
      const layout = this.$route.meta.layout || 'default';
      this.setBodyClass();
      this.setLayout(`${layout}-layout`);
      this.$jQuery('.collapse.show.closable').collapse('hide');
    }
  }
};
</script>
<style>
textarea {
  resize: none;
}

.form-control-plaintext {
  outline: 0;
}
</style>
