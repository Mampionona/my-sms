<template>
  <div>
    <page-header>
      <template slot="title">Welcome!</template>
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
                  <div class="form-group mb-3">
                    <div class="input-group input-group-merge input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                      </div>
                      <input class="form-control" placeholder="Email" type="email" v-model="email">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-merge input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                      </div>
                      <input class="form-control" placeholder="Password" type="password" v-model="password">
                    </div>
                  </div>
                  <div class="custom-control custom-control-alternative custom-checkbox">
                    <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                    <label class="custom-control-label" for=" customCheckLogin">
                      <span class="text-muted">Remember me</span>
                    </label>
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
import * as auth from '@/api/auth';
import PageHeader from '@/components/layouts/partials/PageHeader';
export default {
  components: { PageHeader },
  data () {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    onSubmit () {
      const { email, password } = this;
      // promise
      auth.login({ email, password })
        .then(() => this.$router.push({ name: 'dashboard.index' }))
        .catch(() => alert('unauthenticated!'));
    }
  }
}
</script>
