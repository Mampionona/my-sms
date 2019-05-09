<template>
  <div class="header pb-6 pt-3 d-flex align-items-center bg-primary" v-if="Object.keys(user).length">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-7 col-md-10">
          <h1 class="display-2 text-white">Bonjour {{ user.firstname }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: Object
  }
};
</script>
