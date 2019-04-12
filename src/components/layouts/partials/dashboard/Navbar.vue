<template>
  <div class="collapse navbar-collapse" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'dashboard.index' }" class="nav-link">
          <i class="ni ni-shop text-primary"></i>
          <span class="nav-link-text">Tableau de bord</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#navbar-examples" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="navbar-examples">
          <i class="ni ni-ungroup text-orange"></i>
          <span class="nav-link-text">Base de contacts</span>
        </a>
        <div class="collapse" id="navbar-examples" style="">
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'contacts.list' }">Liste des contacts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="#">Importer des contacts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="#">Louer une base</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="#">STOP SMS</router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
