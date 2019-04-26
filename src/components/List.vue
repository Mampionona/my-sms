<template>
  <tr>
    <th scope="row">
      <span class="name mb-0 text-sm">{{ list.name }}</span>
    </th>
    <td class="budget">{{ list.contacts }}</td>
    <td>{{ list.updateDate | full }}</td>
    <td class="text-right">
      <button class="btn btn-danger" @click.prevent="deleteList(list.id)"><i class="fas fa-trash-alt"></i></button>
      <button class="btn btn-success" @click.prevent="showList(list.id)"><i class="fas fa-bars"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    list: {
      required: true,
      type: Object
    },
    deleteClickCallback: Function,
    showClickCallback: Function
  },
  methods: {
    deleteList (listId) {
      if (this.deleteClickCallback) {
        this.deleteClickCallback(listId);
      }
    },
    showList (listId) {
      if (this.showClickCallback) {
        this.showClickCallback(listId);
      }
    }
  }
};
</script>
