<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="`${id}-label`" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div v-if="title" class="modal-header">
          <h5 class="modal-title" :id="`${id}-label`">{{ title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="acceptButton || cancelButton" class="modal-footer">
          <button v-if="cancelButton" type="button" class="btn btn-secondary" data-dismiss="modal">{{ cancelButtonLabel }}</button>
          <button v-if="acceptButton" type="button" :class="acceptButtonClass" @click="$emit('accept')">{{ acceptButtonLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    acceptButtonClass() {
      const color = `btn-${this.acceptButtonColor}`;
      return { btn: true, [color]: true };
    }
  },
  props: {
    acceptButton: { default: false, type: Boolean },
    acceptButtonColor: { default: 'primary', type: String },
    cancelButton: { default: false, type: Boolean },
    cancelButtonLabel: String,
    acceptButtonLabel: String,
    id: { required: true, type: String },
    title: String
  }
};
</script>
