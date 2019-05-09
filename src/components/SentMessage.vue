<template>
  <tr>
    <td>{{ message.name }}</td>
    <td>{{ message.sentDate | full }}</td>
    <td class="text-right">
      <button class="btn btn-secondary" @click="$emit('show', message.id)"><i class="fas fa-bars"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    message: {
      required: true,
      type: Object
    }
  }
};
</script>
