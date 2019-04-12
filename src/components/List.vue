<template>
  <tr>
    <th scope="row">
      <div class="media align-items-center">                    
        <div class="media-body">
          <span class="name mb-0 text-sm">{{ list.name }}</span>
        </div>
      </div>
    </th>
    <td class="budget">nb contacts</td>
    <td>date</td>
    <td>non verifie</td>
    <td class="text-right">
      <v-btn icon="fas fa-check-circle" color="primary"></v-btn>
      <v-btn icon="fas fa-trash-alt" color="danger" @click.native="removeList(list.id)"></v-btn>
      <v-btn icon="fas fa-bars" color="success" @click.native="showContacts(list.id)"></v-btn>
    </td>
  </tr>
</template>
<script>
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  props: {
    list: {
      required: true,
      type: Object
    }
  },
  methods: {
    removeList(id) {
      alert('delete ' + id);
    },
    showContacts(id) {
      alert('show ' + id);
    }
  }
};
</script>
