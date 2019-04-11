<template>
  <div>
    <page-header>
      <template slot="title">Connexion</template>
      <template slot="text">Magni officiis odio laboriosam eum eos consequatur praesentium.</template>
    </page-header>
    
    <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Sign in with credentials</small>
                </div>
                <form role="form" @submit.prevent="onSubmit">
                  <form-group class="mb-3">
                    <i slot="icon" class="ni ni-email-83"></i>
                    <input slot="input" class="form-control" placeholder="E-mail" type="email" v-model="email">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-lock-circle-open"></i>
                    <input slot="input" class="form-control" placeholder="Mot de passe" type="password" v-model="password">
                  </form-group>
                  <div class="custom-control custom-control-alternative custom-checkbox">
                    <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                    <label class="custom-control-label" for=" customCheckLogin">
                      <span class="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div class="text-center" v-if="isLoading">
                    <spinner></spinner>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary my-4">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <a href="#" class="text-light"><small>Forgot password?</small></a>
              </div>
              <div class="col-6 text-right">
                <router-link :to="{ name: 'register' }" class="text-light"><small>Create new account</small></router-link>
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
import { mapActions } from 'vuex';

export default {
  components: { PageHeader, FormGroup, Spinner },
  data () {
    return {
      isLoading: false,
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate'
    }),
    onSubmit () {
      this.isLoading = true;
      const { email, password } = this;

      this.authenticate({ email, password })
        .then(() => {
          this.$router.push({
            name: 'dashboard.index'
          });
        })
        .catch((error) => {
          this.isLoading = false;
        });
    }
  }
}
</script>
