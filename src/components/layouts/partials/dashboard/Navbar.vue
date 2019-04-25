<template>
  <div class="collapse navbar-collapse" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'dashboard.index' }" class="nav-link">
          <i class="ni ni-shop"></i>
          <span class="nav-link-text">Tableau de bord</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'packs' }">
          <i class="ni ni-credit-card"></i>
          <span class="nav-link-text">Acheter des SMS</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a :class="dropdownToggleClass(baseContacts)" href="#base-contacts" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="base-contacts">
          <i class="ni ni-ungroup"></i>
          <span class="nav-link-text">Base de contacts</span>
        </a>
        <div class="collapse" id="base-contacts" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'lists' }">Liste des contacts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'list.import' }">Importer des contacts</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a :class="dropdownToggleClass(campagneSMS)" href="#campagne-sms" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="campagne-sms">
          <i class="fa fa-th-large"></i>
          <span class="nav-link-text">Campagne SMS</span>
        </a>
        <div class="collapse" id="campagne-sms" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'message.redaction' }">Créer une campagne</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'message.drafts' }">Brouillons</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a :class="dropdownToggleClass(boiteEnvoi)" href="#boite-envoi" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="boite-envoi">
          <i class="ni ni-send"></i>
          <span class="nav-link-text">Boîte d'envoi</span>
        </a>
        <div class="collapse" id="boite-envoi" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'message.list' }">Envois effectués</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'message.scheduled' }">Envois planifiés</router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'inbox' }" class="nav-link">
          <i class="fas fa-inbox"></i>
          <span class="nav-link-text">Boîte de réception</span>
        </router-link>
      </li>
      <li v-if="isAdmin" class="nav-item">
        <a :class="dropdownToggleClass(administration)" href="#administration" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="administration">
          <i class="fas fa-users-cog"></i>
          <span class="nav-link-text">Admin</span>
        </a>
        <div class="collapse" id="administration">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link class="nav-link" to="">Utilisateurs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="">Paiements effectués</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="">Plan</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      isAdmin: 'auth/isAdmin'
    }),
  },
  data () {
    return {
      baseContacts: ['lists', 'list.import'],
      campagneSMS: ['message.redaction', 'message.drafts'],
      boiteEnvoi: ['message.list', 'message.scheduled'],
      administration: []
    };
  },
  methods: {
    dropdownToggleClass (classes) {
      return {
        'nav-link': true,
        'active': classes.includes(this.$route.name)
      };
    }
  },
  mounted () {
    const vm = this;
    const collapses = vm.$jQuery('.navbar-nav .collapse');
    const routes = [
      ...this.baseContacts,
      ...this.campagneSMS,
      ...this.boiteEnvoi,
      ...this.administration
    ];
    const pathName = vm.$route.name;
    let collapseElement;

    collapses.on('show.bs.collapse', e => {
      collapses.each((i, collapse) => {
        if (collapse !== e.currentTarget) {
          vm.$jQuery(collapse).collapse('hide');
        }
      });
    });

    vm.$jQuery('.navbar-nav > .nav-item > .nav-link').on('click', () => {
      if (!routes.includes(vm.$route.name)) {
        vm.$jQuery('.navbar-nav .collapse').collapse('hide');
      }
    });
    
    if (this.baseContacts.includes(pathName)) {
      collapseElement = '#base-contacts';
    } else if (this.campagneSMS.includes(pathName)) {
      collapseElement = '#campagne-sms';
    } else if (this.boiteEnvoi.includes(pathName)) {
      collapseElement = '#boite-envoi';
    } else if (this.administration.includes(pathName)) {
      collapseElement = '#administration';
    }

    if (collapseElement) {
      vm.$jQuery(collapseElement).collapse('show');
    }
  }
}
</script>
