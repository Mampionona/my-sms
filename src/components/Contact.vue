<template>
  <tr>
    <td><slot name="checkbox"></slot></td>
    <th scope="row"><span class="text-sm">{{ contact.telephone }}</span></th>
    <td>{{ contact.lastname }}</td>
    <td>{{ contact.firstname }}</td>
    <td>
      <ul v-if="attributes" class="mb-0 pl-3" style="list-style: circle">
        <li v-for="(attribute, index) in attributes" :key="index">{{ attribute }}</li>
      </ul>
      <span v-else>Aucun Paramètre</span>
    </td>
    <td class="text-right">
      <v-btn v-if="contact.stop" icon="fas fa-envelope-open" title="Retirer de la liste des stops" @click.native="$emit('remove-stop', contact)"></v-btn>
      <v-btn icon="fas fa-trash-alt" color="danger" @click.native="$emit('delete-contact', contact)"></v-btn>
    </td>
  </tr>
</template>
<script>
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  computed: {
    attributes() {
      const { attributes } = this.contact;
      const $keys = Object.keys(attributes);
      if (!$keys.length) return false;
      return $keys.map(attribute => `${attribute} : ${attributes[attribute]}`);
    }
  },
  props: {
    contact: {
      required: true,
      type: Object
    }
  }
};
</script>
