<template>
  <div class="auto-connect">
    <page-header></page-header>
    <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div v-if="isLoading" class="text-center">
              <loading-progress
                indeterminate
                hide-background
                size="64"
                rotate
                fillDuration="2"
                rotationDuration="1"
              />
              <div class="text-color">Vérification en cours ...</div>
            </div>
            <div class="card text-center" v-if="hasError">
              <div class="card-body">
                <p class="card-text">Votre lien de réinitialisation de mot de passe semble avoir expiré.</p>
                <router-link :to="{ name: 'password' }" class="btn btn-primary">Demander un nouveau lien</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import PageHeader from '@/components/layouts/partials/PageHeader';
import { BAD_REQUEST } from '@/utils';
import Axios from 'axios';

export default {
  components: { PageHeader },
  data() {
    return {
      isLoading: false,
      hasError: false
    };
  },
  methods: {
    ...mapActions({
      getUser: 'auth/getUser'
    }),
    ...mapMutations({
      setToken: 'auth/SET_TOKEN',
      logout: 'auth/LOGOUT'
    })
  },
  mounted() {
    if (!this.$route.query.token) this.$router.push('/');
    else {
      const { token } = this.$route.query;

      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      this.isLoading = true;
      
      this.getUser()
        .then(() => {
          this.setToken(token);
          localStorage.setItem('token', token);
          this.$router.push({ name: 'profile' });
        })
        .catch(({ status }) => {
          this.logout();
          localStorage.removeItem('token');
          if ('Authorization' in Axios.defaults.headers.common) delete Axios.defaults.headers.common.Authorization;
          if (status === BAD_REQUEST) this.hasError = true;
        })
        .finally(() => this.isLoading = false);
    }
  }
};
</script>
<style>
.vue-progress-path path {
  stroke-width: 4;
}
</style>
