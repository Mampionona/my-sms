<template>
  <tr>
    <td>{{ answer.telephone }}</td>
    <td>{{ answer.answer }}</td>
    <td class="text-right">
      <button class="btn btn-danger" @click.prevent="$emit('delete-answer', answer.id)"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    answer: {
      required: true,
      type: Object
    }
  }
};
</script>
