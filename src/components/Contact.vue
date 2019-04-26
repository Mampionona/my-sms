<template>
  <tr>
    <td>
      <slot name="checkbox"></slot>
    </td>
    <th scope="row">
      <span class="text-sm">{{ contact.telephone }}</span>
    </th>
    <td>{{ contact.lastname }}</td>
    <td>{{ contact.firstname }}</td>
    <td>{{ JSON.stringify(contact.attributes) }}</td>
    <td class="text-right">
      <v-btn icon="fas fa-trash-alt" color="danger" @click.native="onDelete(contact)"></v-btn>
    </td>
  </tr>
</template>
<script>
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  props: {
    contact: {
      required: true,
      type: Object
    },
    deleteClickCallback: Function,
    editClickCallback: Function
  },
  // created () {
  //   console.log(this.contact.attributes);
  // },
  methods: {
    onDelete (contact) {
      if (this.deleteClickCallback) {
        this.deleteClickCallback(contact);
      }
    }
  }
};
</script>
