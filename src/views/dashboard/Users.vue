<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Rôle</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody class="list">
            <user
              v-for="user in users"
              :key="user.id"
              :user="user"
            />
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import vTable from '@/components/vTable';
import User from '@/components/User';
export default {
  components: { vTable, User },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  created () {
    this.getUsers();
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getAllUsers'
    })
  }
}
</script>
