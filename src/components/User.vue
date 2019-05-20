<template>
  <tr>
    <td>{{ user.lastname }}</td>
    <td>{{ user.firstname }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.userRole }}</td>
    <td>{{ user.credits | formatNumber }} SMS</td>
    <td class="text-right" v-if="isAdmin">
      <button class="btn btn-danger" @click="$emit('show-delete-user-modal', user)"><i class="fas fa-trash-alt"></i></button>
      <button class="btn btn-secondary" @click="$emit('edit', user)"><i class="fas fa-pencil-alt"></i></button>
    </td>
  </tr>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ isAdmin: 'auth/isAdmin' })
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  }
};
</script>
