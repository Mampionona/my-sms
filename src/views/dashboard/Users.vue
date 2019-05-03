<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="users">
          <template slot-scope="{ row }">
            <user :user="row"/>
          </template>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import User from '@/components/User';

export default {
  components: { User },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  created() {
    this.getUsers();
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      columns: [
        { label: 'Nom', field: 'lastname' },
        { label: 'Prénom', field: 'firstname' },
        { label: 'Rôle', field: 'userRole' },
        { label: 'Crédits', field: 'credits' }
      ]
    };
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getAllUsers'
    })
  }
};
</script>
