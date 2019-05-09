<template>
  <div class="register">
    <page-header></page-header>
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary border-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <h1>Créer un nouveau compte</h1>
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
                  <div class="row my-4">
                    <div class="col-12">
                      <div class="custom-control custom-control-alternative custom-checkbox">
                        <input class="custom-control-input" id="customCheckRegister" type="checkbox" v-model="privacy">
                        <label class="custom-control-label" for="customCheckRegister">
                          <span class="text-muted">J'accèpte la politique <a href="https://my-sms.pro/conditions-generales">de Confidentialité</a></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="text-center" v-if="isLoading">
                    <spinner></spinner>
                  </div>

                  <p v-if="hasError" class="text-danger text-sm">{{ errorMessage }}</p>

                  <div class="text-center">
                    <button type="submit" :disabled="!privacy" class="btn btn-primary mt-4">Créer le compte</button>
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
import { mapActions } from 'vuex';
import { removeSpaces } from '@/utils';
import PageHeader from '@/components/layouts/partials/PageHeader';
import FormGroup from '@/components/partials/FormGroup';
import Spinner from '@/components/Spinner';

export default {
  components: { PageHeader, FormGroup, Spinner },
  data() {
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
      password: '',
      privacy: false
    };
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      getUser: 'auth/getUser'
    }),
    onSubmit() {
      this.isLoading = true;
      this.hasError = false;
      const { company, firstname, lastname, userRole, street, city, telephone, mobile, email, password } = this;
      let { siren, tva, postcode } = this;
      postcode = parseInt(postcode, 10);
      // remove spaces
      siren = removeSpaces(siren);
      tva = removeSpaces(tva);

      this.register({ company, siren, tva, firstname, lastname, userRole, street, city, postcode, telephone, mobile, email, password })
        .then(() => {
          this.hasError = false;
          // fetch logged in user
          this.getUser().then(() => this.$router.push({
            name: 'dashboard'
          }));
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
