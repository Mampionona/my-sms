<template>
  <form role="form" @submit.prevent="onSubmit">
    <form-group>
      <i slot="icon" class="ni ni-building"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Société')}`" type="text" v-model="company">
    </form-group>
    <form-group>
      <i slot="icon" class="fas fa-building"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('SIREN')}`" type="text" v-model.trim="siren">
    </form-group>
    <form-group>
      <i slot="icon" class="fas fa-money-check-alt"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('TVA')}`" type="text" v-model.trim="tva">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-circle-08"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Prénom')}`" type="text" v-model="firstname">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-circle-08"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Nom')}`" type="text" v-model="lastname">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-badge"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Role')}`" type="text" v-model="userRole">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-pin-3"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Rue')}`" type="text" v-model="street">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-square-pin"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Ville')}`" type="text" v-model="city">
    </form-group>
    <form-group>
      <i slot="icon" class="fas fa-map-pin"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Code postal')}`" type="number" v-model="postcode">
    </form-group>
    <form-group>
      <i slot="icon" class="fa fa-phone fa-flip-horizontal"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Téléphone')}`" type="text" v-model="telephone">
    </form-group>
    <form-group>
      <i slot="icon" class="fas fa-mobile-alt"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Mobile')}`" type="text" v-model="mobile">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-email-83"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('E-mail')}`" type="email" v-model="email">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-lock-circle-open"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Mot de passe')}`" type="password" v-model="password" autocomplete="new-password">
    </form-group>
    <form-group>
      <i slot="icon" class="ni ni-lock-circle-open"></i>
      <input slot="input" class="form-control" :placeholder="`${$t('Crédits')}`" v-model="credits" type="number">
    </form-group>
    <div class="form-group">
      <label class="form-control-label" for="plan">{{ $t('Formule') }}</label>
      <select class="form-control" id="plan" v-model="planId">
        <option :value="null">{{ $t('Choisir') }}</option>
        <option v-for="(plan, index) in plans" :key="index" :value="plan.id">{{ plan.name }}</option>
      </select>
    </div>
    <div class="text-center" v-if="updateAnyUserLoading">
      <spinner></spinner>
    </div>
    <p :class="statusClass">{{ $t(statusMessage) }}</p>
    <div class="text-center">
      <button type="submit" class="btn btn-primary mt-4">{{ $t(buttonLabel) }}</button>
    </div>
  </form>
</template>
<script>
import FormGroup from '@/components/partials/FormGroup';
import Spinner from '@/components/Spinner';
import { removeSpaces } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  components: { FormGroup, Spinner },
  computed: {
    ...mapGetters({ updateAnyUserLoading: 'users/updateAnyUserLoading' }),
    buttonLabel() {
      return this.update ? 'Mettre à jour' : 'Créer le compte';
    },
    hasError() {
      return this.errors && Object.keys(this.errors).length > 0;
    },
    statusMessage() {
      if (this.successMessage) return this.successMessage;
      return '';
    },
    statusClass() {
      return {
        'text-center': true,
        'text-danger': this.hasError,
        'font-weight-bold': true,
        'text-sm': true
      };
    }
  },
  data() {
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
      credits: null,
      planId: null
    };
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.userData());
    },
    userData() {
      const { company, siren, tva, firstname, lastname, userRole, street, city, postcode, telephone, mobile, email, password, credits, planId } = this;
      const data = {
        company,
        siren: removeSpaces(siren),
        tva: removeSpaces(tva),
        firstname,
        lastname,
        userRole,
        street,
        city,
        postcode: parseInt(postcode, 10),
        telephone,
        mobile,
        email,
        password
      };

      if (!this.update) return data;
      const { id } = this.user;

      return {
        ...data,
        userId: id,
        credits: parseInt(credits, 10),
        planId: parseInt(planId, 10)
      };
    }
  },
  props: {
    errors: Object,
    plans: Array,
    policyEnabled: {
      default: false,
      type: Boolean
    },
    successMessage: String,
    update: {
      default: false,
      type: Boolean
    },
    user: Object
  },
  watch: {
    user(user) {
      Object.keys(user).forEach((field) => {
        if (field in this.$data) {
          this[field] = user[field];
        }
      });
    }
  }
};
</script>
