<template>
  <div class="login">
    <page-header></page-header>
    <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <h1>{{ $t('Connexion à votre compte') }}</h1>
                </div>
                <form role="form" @submit.prevent="onSubmit">
                  <form-group class="mb-3">
                    <i slot="icon" class="ni ni-email-83"></i>
                    <input slot="input" class="form-control" :placeholder="`${$t('E-mail')}`" type="email" v-model="email">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-lock-circle-open"></i>
                    <input slot="input" class="form-control" :placeholder="`${$t('Mot de passe')}`" type="password" v-model="password" autocomplete="new-password">
                  </form-group>
                  <div class="custom-control custom-control-alternative custom-checkbox">
                    <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                    <label class="custom-control-label" for=" customCheckLogin">
                      <span class="text-muted">{{ $t('Rester connecté') }}</span>
                    </label>
                  </div>
                  <div class="text-center" v-if="isLoading">
                    <spinner></spinner>
                  </div>
                  <alert v-if="hasError" class="mt-5" color="warning" icon="fas fa-exclamation-triangle">{{ $t(errorMessage) }}</alert>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary my-4">{{ $t('Connexion') }}</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <router-link class="text-light" :to="{name: 'password'}"><small>{{ $t('Mot de passe oublié ?') }}</small></router-link>
              </div>
              <div class="col-6 text-right">
                <router-link :to="{ name: 'register' }" class="text-light"><small>{{ $t('Créer un compte') }}</small></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
// import * as auth from '@/api/auth';
import PageHeader from '@/components/layouts/partials/PageHeader';
import FormGroup from '@/components/partials/FormGroup';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import { mapActions } from 'vuex';

export default {
  components: { PageHeader, FormGroup, Spinner, Alert },
  data() {
    return {
      hasError: false,
      errorMessage: '',
      isLoading: false,
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      getUser: 'auth/getUser'
    }),
    onSubmit() {
      this.isLoading = true;
      this.hasError = false;
      const { email, password } = this;

      this.authenticate({ email, password })
        .then(() => {
          // fetch user after login success
          this.getUser();
          // redirection
          this.$router.push(this.$route.query.redirect || { name: 'dashboard' });
        })
        .catch(({ data }) => {
          this.isLoading = false;
          this.errorMessage = data.error;
          this.hasError = true;
        });
    }
  }
};
</script>
