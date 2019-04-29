<template>
  <nav id="navbar-main" class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
    <div class="container">
      <router-link :to="{name: 'login'}" class="navbar-brand">
        <img src="@/assets/images/logo.png" alt="">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <navbar></navbar>
    </div>
  </nav>
</template>
<script>
import Navbar from '@/components/layouts/partials/Navbar';

export default {
  components: { Navbar }
};
</script>
