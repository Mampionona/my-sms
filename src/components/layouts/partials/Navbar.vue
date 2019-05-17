<template>
  <div class="navbar-collapse navbar-custom-collapse collapse closable" id="navbar-collapse" ref="collapse">
    <div class="navbar-collapse-header">
      <div class="row">
        <div class="col-6 collapse-brand">
          <a href="../../pages/dashboards/dashboard.html">
            <img src="@/assets/images/logo.png" alt="logo">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link :to="{name: 'login'}" class="nav-link">
          <span class="nav-link-inner--text">{{ $t('Connexion') }}</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'register'}" class="nav-link">
          <span class="nav-link-inner--text">{{ $t('Inscription') }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
