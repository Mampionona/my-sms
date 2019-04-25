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
        <a class="nav-link" href="#base-contacts" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="base-contacts">
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
        <a class="nav-link" href="#campagne-sms" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="campagne-sms">
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
        <a class="nav-link" href="#boite-envoi" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="boite-envoi">
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
        <router-link :to="{ name: 'admin' }" class="nav-link">
          <i class="fas fa-users-cog"></i>
          <span class="nav-link-text">Admin</span>
        </router-link>
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
  mounted () {
    const vm = this;
    const collapses = vm.$jQuery('.navbar-nav .collapse');
    const routes = ['lists', 'list.import', 'message.redaction', 'message.drafts', 'message.list', 'message.scheduled'];
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
    
    if (['lists', 'list.import'].includes(pathName)) {
      collapseElement = '#base-contacts';
    } else if (['message.redaction', 'message.drafts'].includes(pathName)) {
      collapseElement = '#campagne-sms';
    } else if (['message.list', 'message.scheduled'].includes(pathName)) {
      collapseElement = '#boite-envoi';
    }

    if (collapseElement) {
      vm.$jQuery(collapseElement).collapse('show');
    }
  }
}
</script>
