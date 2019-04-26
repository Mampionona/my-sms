<template>
  <div :class="classObject" role="alert">
    <span v-if="icon" class="alert-icon"><i :class="icon"></i></span>
    <span class="alert-text">
      <slot></slot>
    </span>
    <button v-if="dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  computed: {
    classObject() {
      const color = `alert-${this.color}`;
      return {
        alert: true,
        fade: true,
        show: true,
        'd-flex': true,
        [color]: this.color,
        'alert-dismissible': this.dismissible
      };
    }
  },
  props: {
    icon: { type: String },
    dismissible: { type: Boolean },
    color: { type: String }
  }
};
</script>
