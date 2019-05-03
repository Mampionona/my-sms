<template>
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="all-contacts" v-model="allContacts">
    <label class="custom-control-label" for="all-contacts"></label>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allContacts: false
    };
  }
};
</script>
