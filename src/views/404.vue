<template>
  <div class="not-found">
    <page-header>
      <template slot="title">404</template>
      <template slot="text">Cette page est introuvable... <router-link class="text-color" :to="{ name: 'dashboard' }">Revenir au à l’accueil ?</router-link></template>
    </page-header>
  </div>
</template>
<script>
import PageHeader from '@/components/layouts/partials/PageHeader';

export default {
  components: { PageHeader }
};
</script>
