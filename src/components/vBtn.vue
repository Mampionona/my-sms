<template>
  <button :class="buttonClass">
    <span v-if="icon" class="btn-inner--icon"><i :class="icon"></i></span>
    <span v-if="icon && $slots.default" class="btn-inner--text"><slot></slot></span>
    <slot v-else></slot>
  </button>
</template>
<script>
export default {
  props: {
    color: {
      type: String
    },
    icon: {
      type: String
    }
  },
  computed: {
    buttonClass () {
      return {
        btn: true,
        'btn-icon': !!this.icon,
        [ `btn-${this.color}` ]: !!this.color
      };
    }
  }
};
</script>
