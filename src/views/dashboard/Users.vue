<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="users" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <user :user="row" @edit="editUser"></user>
          </template>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
      <div class="modal fade" id="edit-user" tabindex="-1" role="dialog" aria-labelledby="edit-user" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <custom-scrollbar class="modal-scroll-area" :settings="settings">
                <div class="card bg-secondary shadow border-0">
                  <div v-if="user" class="card-header bg-transparent">
                    <div class="text-muted text-center my-2"><small>{{ user | fullname }}</small></div>
                  </div>
                  <div class="card-body px-lg-5 py-lg-5">
                    <user-form
                      :user="user"
                      :plans="plans"
                      update
                      @submit="onSubmit"
                      :success-message="success"
                      :error="error">
                    </user-form>
                  </div>
                </div>
              </custom-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomScrollbar from 'vue-custom-scrollbar';
import UserForm from '@/components/form/UserForm';
import User from '@/components/User';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { User, UserForm, CustomScrollbar },
  computed: {
    ...mapGetters({
      users: 'users/users',
      plans: 'plans/plans',
      isAdmin: 'auth/isAdmin'
    }),
    columns() {
      const columns = [
        { label: 'Nom', field: 'lastname' },
        { label: 'Prénom', field: 'firstname' },
        { label: 'Rôle', field: 'userRole' },
        { label: 'Crédits', field: 'credits' }
      ];
      if (!this.isAdmin) return columns;
      // add edit button
      return [
        ...columns,
        { label: '', representedAs: () => '' }
      ];
    }
  },
  mounted() {
    this.getUsers();
    if (this.isAdmin) this.getPlans();
  },
  data() {
    return {
      error: false,
      success: '',
      page: 1,
      per_page: 10,
      user: null,
      settings: {
        suppressScrollX: true,
        swipeEasing: true
      }
    };
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getAllUsers',
      getPlans: 'plans/getPlans',
      updateAnyUser: 'users/updateAnyUser'
    }),
    editUser(user) {
      this.user = user;
      this.success = '';
      this.error = null;
      this.$jQuery('#edit-user').modal('show');
    },
    onSubmit(user) {
      if (this.isAdmin) {
        this.updateAnyUser(user)
          .then(() => {
            this.success = 'Modifications enregistrées !';
          })
          .catch((error) => {
            this.error = error;
          });
      }
    }
  }
};
</script>
<style>
.modal-scroll-area {
  height: 95vh;
  position: relative;
}
</style>
