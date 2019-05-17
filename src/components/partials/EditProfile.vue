<template>
  <div class="card">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-8">
          <h3 class="mb-0">{{ $t('Mon compte') }}</h3>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="onSubmit">
        <h6 class="heading-small text-muted mb-4">{{ $t('Informations de l\'utilisateur') }}</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-firstname">{{ $t('Prénom') }}</label>
                <input type="text" id="input-firstname" class="form-control" v-model="firstname">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-lastname">{{ $t('Nom') }}</label>
                <input type="text" id="input-lastname" class="form-control" v-model="lastname">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-email">{{ $t('E-mail') }}</label>
                <input type="email" id="input-email" class="form-control" v-model="email">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-user-role">{{ $t('Fonction') }}</label>
                <input type="text" id="input-user-role" class="form-control" v-model="userRole">
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <!-- Address -->
        <h6 class="heading-small text-muted mb-4">{{ $t('Informations de contact') }}</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-street">{{ $t('Rue') }}</label>
                <input type="text" id="input-street" class="form-control" v-model="street">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-city">{{ $t('Ville') }}</label>
                <input type="text" id="input-city" class="form-control" v-model="city">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-postal-code">{{ $t('Code postal') }}</label>
                <input type="number" id="input-postal-code" class="form-control" v-model="postcode">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-telephone">{{ $t('Téléphone') }}</label>
                <input type="text" id="input-telephone" class="form-control" v-model="telephone">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-mobile">{{ $t('Mobile') }}</label>
                <input type="text" id="input-mobile" class="form-control" v-model="mobile">
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <!-- Description -->
        <h6 class="heading-small text-muted mb-4">{{ $t('Société') }}</h6>
        <div class="pl-lg-4">
          <div class="form-group">
            <label class="form-control-label" for="input-company">{{ $t('Nom de la société') }}</label>
            <input type="text" id="input-company" class="form-control" v-model="company">
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-siren">{{ $t('SIREN') }}</label>
                <input type="text" id="input-siren" class="form-control" v-model.trim="siren">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-tva">{{ $t('TVA') }}</label>
                <input type="text" id="input-tva" class="form-control" v-model.trim="tva">
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <h6 class="heading-small text-muted mb-4">{{ $t('Mot de passe') }}</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-password">{{ $t('Nouveau mot de passe') }}</label>
                <input type="password" autocomplete="new-password" id="input-password" class="form-control" v-model="password">
              </div>
            </div>
          </div>
        </div>
        <p v-if="isUpdated || hasError" :class="statusClass">{{ $t(updateStatus) }}</p>
        <div class="text-right">
          <button class="btn btn-primary">{{ $t('Mettre à jour') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { removeSpaces } from '@/utils';

export default {
  computed: {
    statusClass() {
      return {
        'text-danger': this.hasError,
        'text-success': this.isUpdated,
        'font-weight-bold': true,
        'text-sm': true
      };
    }
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  mounted() {
    const { user } = this;
    Object.keys(user).forEach((key) => {
      if (key in this.$data) this[key] = user[key];
    });
  },
  data() {
    return {
      isUpdated: false,
      hasError: false,
      updateStatus: '',
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
      updateAccount: 'auth/updateAccount'
    }),
    onSubmit() {
      const { company, firstname, lastname, userRole, street, city, postcode, telephone, mobile, email, password } = this;
      let { siren, tva } = this;

      siren = removeSpaces(siren.toString());
      tva = removeSpaces(tva.toString());

      this.updateAccount({ company, siren, tva, firstname, lastname, userRole, street, city, postcode, telephone, mobile, email, password })
        .then(() => {
          this.isUpdated = true;
          this.hasError = false;
          this.updateStatus = 'Profil mis à jour';
        })
        .catch(({ data }) => {
          this.isUpdated = false;
          this.hasError = true;
          this.updateStatus = data.error;
        });
    }
  }
};
</script>
