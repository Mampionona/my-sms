<template>
  <div>
    <page-header>
      <template slot="title">Create an account</template>
      <template slot="text">Use these awesome forms to login or create new account in your project for free.</template>
    </page-header>

    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary border-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Sign up with credentials</small>
                </div>
                <form role="form" @submit.prevent="onSubmit">
                  <form-group>
                    <i slot="icon" class="ni ni-building"></i>
                    <input slot="input" class="form-control" placeholder="Société" type="text" v-model="company">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="fas fa-building"></i>
                    <input slot="input" class="form-control" placeholder="SIREN" type="text" v-model="siren">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="fas fa-money-check-alt"></i>
                    <input slot="input" class="form-control" placeholder="TVA" type="text" v-model="tva">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-circle-08"></i>
                    <input slot="input" class="form-control" placeholder="Prénom" type="text" v-model="firstname">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-circle-08"></i>
                    <input slot="input" class="form-control" placeholder="Nom" type="text" v-model="lastname">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-badge"></i>
                    <input slot="input" class="form-control" placeholder="Role" type="text" v-model="userRole">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-pin-3"></i>
                    <input slot="input" class="form-control" placeholder="Rue" type="text" v-model="street">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-square-pin"></i>
                    <input slot="input" class="form-control" placeholder="Ville" type="text" v-model="city">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="fas fa-map-pin"></i>
                    <input slot="input" class="form-control" placeholder="Code postal" type="number" v-model="postcode">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="fa fa-phone fa-flip-horizontal"></i>
                    <input slot="input" class="form-control" placeholder="Téléphone" type="text" v-model="telephone">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="fas fa-mobile-alt"></i>
                    <input slot="input" class="form-control" placeholder="Mobile" type="text" v-model="mobile">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-email-83"></i>
                    <input slot="input" class="form-control" placeholder="E-mail" type="email" v-model="email">
                  </form-group>
                  <form-group>
                    <i slot="icon" class="ni ni-lock-circle-open"></i>
                    <input slot="input" class="form-control" placeholder="Mot de passe" type="password" v-model="password" autocomplete="new-password">
                  </form-group>                  
                  <!-- <div class="text-muted font-italic"><small>password strength: <span class="text-success font-weight-700">strong</span></small></div> -->
                  <div class="row my-4">
                    <div class="col-12">
                      <div class="custom-control custom-control-alternative custom-checkbox">
                        <input class="custom-control-input" id="customCheckRegister" type="checkbox">
                        <label class="custom-control-label" for="customCheckRegister">
                          <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="text-center" v-if="isLoading">
                    <spinner></spinner>
                  </div>
                  
                  <alert v-if="hasError" class="mt-5" color="warning" icon="fas fa-exclamation-triangle">{{ errorMessage }}</alert>
                  
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary mt-4">Create account</button>
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
import Alert from '@/components/Alert';
import { mapActions } from 'vuex';

export default {
  components: { PageHeader, FormGroup, Spinner, Alert },
  data () {
    return {
      isLoading: false,
      hasError: false,
      errorMessage: '',
      company: '',
      siren: '',
      tva: '',
      firstname: '',
      lastname: '',
      userRole: '',
      street: '',
      city: '',
      postcode: '',
      telephone: '',
      mobile: '',
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      getUser: 'auth/getUser'
    }),
    onSubmit () {
      this.isLoading = true;
      this.hasError = false;
      const { company, firstname, lastname, userRole, street, city, postcode, telephone, mobile, email, password } = this;
      let { siren, tva } = this;
      // remove spaces
      siren = siren.removeSpaces();
      tva = tva.removeSpaces();

      this.register({ company, siren, tva, firstname, lastname, userRole, street, city, postcode, telephone, mobile, email, password })
        .then(() => {
          // fetch logged in user
          this.getUser();
        })
        .catch(({ data }) => {
          this.isLoading = false;
          this.errorMessage = data.error;
          this.hasError = true;
        });
    }
  }
}
</script>
