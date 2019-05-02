<template>
  <div class="collapse navbar-collapse" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'dashboard' }" class="nav-link">
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
          <i class="fas fa-address-book"></i>
          <span class="nav-link-text">Base de contacts</span>
        </a>
        <div class="collapse" id="base-contacts" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'contacts_list' }">Liste des contacts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'import_file' }">Importer des contacts</router-link>
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
              <router-link class="nav-link" :to="{ name: 'create_campaign' }">Créer une campagne</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'drafts_messages' }">Brouillons</router-link>
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
              <router-link class="nav-link" :to="{ name: 'sent_messages' }">Envois effectués</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'scheduled_messages' }">Envois planifiés</router-link>
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
      <li class="nav-item">
        <router-link :to="{ name: 'stats' }" class="nav-link">
          <i class="fas fa-chart-bar"></i>
          <span class="nav-link-text">Statistiques</span>
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
              <router-link class="nav-link" :to="{name: 'users'}">Utilisateurs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'payments'}">Paiements effectués</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'plans'}">Plans</router-link>
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
    })
  },
  data() {
    return {
      baseContacts: ['contacts_list', 'import_file'],
      campagneSMS: ['create_campaign', 'drafts_messages'],
      boiteEnvoi: ['sent_messages', 'scheduled_messages'],
      administration: ['users', 'payments', 'plans']
    };
  },
  methods: {
    dropdownToggleClass(classes) {
      return {
        'nav-link': true,
        active: classes.includes(this.$route.name)
      };
    }
  },
  mounted () {
    const collapses = this.$jQuery('.navbar-nav .collapse');
    const routes = [
      ...this.baseContacts,
      ...this.campagneSMS,
      ...this.boiteEnvoi,
      ...this.administration
    ];
    const pathName = this.$route.name;
    let collapseElement;

    collapses.on('show.bs.collapse', (e) => {
      collapses.each((i, collapse) => {
        if (collapse.id !== e.currentTarget.id) {
          this.$jQuery(collapse).collapse('hide');
        }
      });
    });

    const handleClick = e => {
      const navItem = e.target.closest('.nav-item');
      if (navItem.children.length === 1) this.$jQuery('.navbar-nav .collapse').collapse('hide');
    };

    document.querySelectorAll('.navbar-nav > .nav-item > .nav-link').forEach(link => link.addEventListener('click', handleClick));

    if (this.baseContacts.includes(pathName)) collapseElement = '#base-contacts';
    else if (this.campagneSMS.includes(pathName)) collapseElement = '#campagne-sms';
    else if (this.boiteEnvoi.includes(pathName)) collapseElement = '#boite-envoi';
    else if (this.administration.includes(pathName)) collapseElement = '#administration';

    if (collapseElement) this.$jQuery(collapseElement).collapse('show');
  }
};
</script>
