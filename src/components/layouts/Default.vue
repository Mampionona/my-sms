<template>
  <div class="default-layout">
    <app-header></app-header>
    <div class="main-content">
      <slot></slot>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './partials/Header';
import Footer from './partials/Footer';
export default {
  components: {
    AppHeader: Header,
    AppFooter: Footer
  }
}
</script>
