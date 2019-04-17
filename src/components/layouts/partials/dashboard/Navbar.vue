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
        <a class="nav-link" href="#base-contacts" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="base-contacts">
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
        <a class="nav-link" href="#campagne-sms" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="campagne-sms">
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
        <a class="nav-link" href="#boite-envoi" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="boite-envoi">
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
    </ul>
  </div>
</template>
