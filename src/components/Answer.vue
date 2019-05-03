<template>
  <tr>
    <td>{{ answer.telephone }}</td>
    <td>{{ answer.answer }}</td>
    <!-- <td>{{ answer.date | full }}</td> -->
    <td class="text-right">
      <button class="btn btn-danger" @click.prevent="onClick"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    clickCallback: Function,
    answer: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClick() {
      if (this.clickCallback) this.clickCallback(this.answer.id);
    }
  }
};
</script>
