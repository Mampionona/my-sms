<template>
  <modal id="fetch-data-error" cancel-button cancel-button-label="Fermer">
    <p>{{ $t(errorMsg) }}</p>
  </modal>
</template>

<script>
import Modal from '@/components/Modal';

export default {
  components: { Modal },
  data() {
    return { errorMsg: '' };
  },
  mounted() {
    this.$eventBus.$on('fetch-data-error', (error) => {
      this.errorMsg = error ? error.data.error : 'Nous avons rencontré une erreur. Veuillez réessayer dans un moment.';
      this.$jQuery(this.$el).modal('show');
    });
  }
};
</script>
