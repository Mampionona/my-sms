<template>
  <div>
    <side-nav></side-nav>
    <div class="main-content" id="panel">
      <top-nav></top-nav>
      <div class="container-fluid mt--6">
        <slot></slot>
      </div>      
    </div>
  </div>
</template>
<script>
import SideNav from './partials/dashboard/SideNav.vue';
import TopNav from './partials/dashboard/TopNav.vue';

export default {
  components: { SideNav, TopNav }
}
</script>
