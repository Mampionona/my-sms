<template>
  <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
      <li
        v-for="(link, index) in $breadcrumbs"
        :key="index"
        :class="{'breadcrumb-item': true, 'active': isLast(index)}"
        :aria-current="isLast(index) ? 'page' : ''"
      >
        <router-link v-if="isFirst(index)" :to="link.path"><i class="fas fa-home"></i></router-link>
        <template v-else-if="isLast(index)">{{ link.meta.breadcrumb }}</template>
        <router-link v-else :to="link.path">
          {{ link.meta.breadcrumb }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>
<script>
export default {
  methods: {
    isFirst(index) {
      return index === 0;
    },
    isLast(index) {
      return index === (this.$breadcrumbs.length - 1);
    }
  }
};
</script>
