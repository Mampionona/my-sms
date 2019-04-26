<template>
  <tr>
    <td>{{ thread.telephone }}</td>
    <td>{{ thread.answer }}</td>
    <!-- <td>{{ thread.date | full }}</td> -->
    <td class="text-right">
      <button class="btn btn-danger" @click.prevent="onClick"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    clickCallback: Function,
    thread: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClick () {
      if (this.clickCallback) this.clickCallback(this.thread.id);
    }
  }
}
</script>
