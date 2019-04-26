<template>
  <tr>
    <td>{{ message.text }}</td>
    <td>{{ message.sentDate | full }}</td>
    <td class="text-right">
      <button class="btn btn-success" @click="onShow"><i class="fas fa-bars"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    message: {
      required: true,
      type: Object
    },
    showClickCallback: Function
  },
  methods: {
    onShow() {
      if (this.showClickCallback) this.showClickCallback(this.message.id);
    }
  }
};
</script>
