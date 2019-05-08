<template>
  <tr>
    <th scope="row">
      <span class="name mb-0 text-sm">{{ list.name }}</span>
    </th>
    <td>{{ list.contacts }}</td>
    <td>{{ list.stops || 0 }}</td>
    <td>{{ list.updateDate | full }}</td>
    <td class="text-right">
      <button class="btn btn-danger" @click.prevent="$emit('delete-list', list)"><i class="fas fa-trash-alt"></i></button>
      <button class="btn btn-success" @click.prevent="$emit('show-list', list.id)"><i class="fas fa-bars"></i></button>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    list: {
      required: true,
      type: Object
    }
  }
};
</script>
