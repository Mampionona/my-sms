<template>
  <router-link :to="to" :class="_class">
    <span v-if="icon" class="link-icon d-flex align-items-center justify-content-center"><i :class="icon"></i></span>
    <span class="link-text text-center">
      <slot></slot>
    </span>
  </router-link>
</template>
<script>
export default {
  computed: {
    _class() {
      return {
        btn: true,
        'd-flex': true,
        'align-items-center': true,
        'link-with-icon': true,
        gris: this.color
      };
    }
  },
  props: {
    to: [String, Object],
    icon: String,
    color: Boolean
  }
};
</script>
<style lang="scss">
$or: #b2a979;
$gris: #d2e3ee;

.link-with-icon {
  border: 0;
  overflow: hidden;
  padding: 0;

  &,
  &:hover {
    background-color: $or;
    color: $gris;

    .link-icon {
      background-color: darken($or, 5%);
    }
  }

  .link-icon {
    height: 90px;
    font-size: 28px;
    width: 90px;
  }

  .link-text {
    width: calc(100% - 90px);
  }

  &.gris {
    background-color: $gris;
    color: $or;

    .link-icon {
      background-color: darken($gris, 5%);
    }
  }
}
</style>
