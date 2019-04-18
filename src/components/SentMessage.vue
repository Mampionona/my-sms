<template>
  <tr>
    <td>{{ message.text }}</td>
    <td>9</td>
    <td>{{ message.date | full }}</td>
    <td class="text-right">
      <button class="btn btn-danger" @click="onDelete"><i class="fas fa-trash-alt"></i></button>
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
    deleteClickCallback: Function,
    showClickCallback: Function
  },
  methods: {
    onDelete () {
      if (this.deleteClickCallback)
        this.deleteClickCallback(this.message.id);
    },
    onShow () {
      if (this.showClickCallback)
        this.showClickCallback(this.message.id);
    },
  }
}
</script>
