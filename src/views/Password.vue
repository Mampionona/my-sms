<template>
  <div class="password">
    <page-header></page-header>
    <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <h1>{{ $t('Réinitialisez votre mot de passe') }}</h1>
                </div>
                <div v-if="sent" class="text-center font-weight-bold">
                  <p class="mb-4 text-sm">
                    {{ $t('Nous avons envoyé des instructions pour vous aider à modifier votre mot de passe à l\'adresse e-mail') }}<br>
                    <strong class="font-weight-bold">{{ email }}.</strong>
                  </p>
                  <router-link class="btn btn-primary" :to="{name: 'login'}">{{ $t('Continuer') }}</router-link>
                </div>
                <form v-else role="form" @submit.prevent="onSubmit">
                  <form-group class="mb-3">
                    <i slot="icon" class="ni ni-email-83"></i>
                    <input slot="input" class="form-control" placeholder="E-mail" type="email" v-model="email" required>
                  </form-group>
                  <div class="text-center" v-if="isLoading">
                    <spinner></spinner>
                  </div>
                  <p v-if="hasError" class="text-sm text-danger">{{ $t(errorMessage) }}</p>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary my-4">{{ $t('Réinitialiser le mot de passe') }}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import PageHeader from '@/components/layouts/partials/PageHeader';
import FormGroup from '@/components/partials/FormGroup';
import Spinner from '@/components/Spinner';
import { mapActions } from 'vuex';

export default {
  components: { PageHeader, FormGroup, Spinner },
  data() {
    return {
      hasError: false,
      sent: false,
      errorMessage: '',
      isLoading: false,
      email: ''
    };
  },
  methods: {
    ...mapActions({
      getLoginLink: 'auth/getLoginLinkViaEmail'
    }),
    onSubmit() {
      const { email } = this;
      if (!email) return;
      this.isLoading = true;
      this.hasError = false;

      this.getLoginLink(email)
        .then(() => {
          this.sent = true;
          this.hasError = false;
          this.isLoading = false;
        })
        .catch(({ data }) => {
          this.isLoading = false;
          this.errorMessage = data.error;
          this.hasError = true;
          this.sent = false;
        });
    }
  }
};
</script>
