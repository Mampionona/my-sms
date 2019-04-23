<template>
  <div class="card">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-8">
          <h3 class="mb-0">Edit profile </h3>
        </div>
        <div class="col-4 text-right">
          <button class="btn btn-sm btn-primary">Mettre à jour</button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="onSubmit">
        <h6 class="heading-small text-muted mb-4">Informations de l'utilisateur</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-firstname">Prénom</label>
                <input type="text" id="input-firstname" class="form-control" v-model="firstname">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-lastname">Nom</label>
                <input type="text" id="input-lastname" class="form-control" v-model="lastname">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-email">E-mail</label>
                <input type="email" id="input-email" class="form-control" v-model="email">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-user-role">Fonction</label>
                <input type="text" id="input-user-role" class="form-control" v-model="userRole">
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <!-- Address -->
        <h6 class="heading-small text-muted mb-4">Informations de contact</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-street">Rue</label>
                <input type="text" id="input-street" class="form-control" v-model="street">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-city">Ville</label>
                <input type="text" id="input-city" class="form-control" v-model="city">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-postal-code">Code postal</label>
                <input type="number" id="input-postal-code" class="form-control" v-model="postcode">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-telephone">Téléphone</label>
                <input type="text" id="input-telephone" class="form-control" v-model="telephone">
              </div>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <label class="form-control-label" for="input-mobile">Mobile</label>
                <input type="text" id="input-mobile" class="form-control" v-model="mobile">
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <!-- Description -->
        <h6 class="heading-small text-muted mb-4">Société</h6>
        <div class="pl-lg-4">
          <div class="form-group">
            <label class="form-control-label" for="input-company">Nom de la société</label>
            <input type="text" id="input-company" class="form-control" v-model="company">            
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-siren">SIREN</label>
                <input type="text" id="input-siren" class="form-control" v-model.trim="siren">            
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-tva">TVA</label>
                <input type="text" id="input-tva" class="form-control" v-model.trim="tva">            
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <h6 class="heading-small text-muted mb-4">Mot de passe</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label class="form-control-label" for="input-password">Nouveau mot de passe</label>
                <input type="password" autocomplete="new-password" id="input-password" class="form-control" v-model="password">            
              </div>
            </div>
          </div>
        </div>
        <div class="pr-2 text-right">
          <button class="btn btn-primary">Mettre à jour</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  props: {
    user: {
      required: true,
      type: Object
    },
    submitCallback: Function
  },
  mounted () {
    const user = this.user;
    for (let column in user) {
      const property = _.camelCase(column);
      if (property in this.$data) {
        this[property] = user[column];
      }
    }
  },
  data () {
    return {
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
    }
  },
  methods: {
    onSubmit () {
      if (this.submitCallback) {
        this.submitCallback(this);
      }
    }
  }
}
</script>