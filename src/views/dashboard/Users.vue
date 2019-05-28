<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="form-group">
                <input type="text" class="form-control" v-model="filter" :placeholder="`${$t('Filtrer par e-mail')}`">
              </div>
            </div>
          </div>
        </div>
        <datatable :columns="columns" :data="users" :filter-by="filter" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <user :user="row" @edit="editUser" @show-delete-user-modal="showDeleteUserModal"></user>
          </template>
          <div slot="no-results" class="text-center">
            <template v-if="isFetching">
              <loading-progress
                indeterminate
                hide-background
                size="28"
                rotate
                fillDuration="2"
                rotationDuration="1"
              />
            </template>
            <template v-else>
              {{ $t('Aucun utilisateur') }}
            </template>
          </div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
      <modal id="edit-user">
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
                :has-error="error"
                :status-message="statusMessage"
              >
              </user-form>
            </div>
          </div>
        </custom-scrollbar>
      </modal>

      <modal
        id="confirm-user-delete"
        @accept="confirmDeleteUser"
        accept-button
        accept-button-label="Supprimer"
        cancel-button
        cancel-button-label="Non"
      >
        Etes-vous certain de vouloir supprimer l'utilisateur ?
      </modal>

      <modal id="delete-user-pending-message" data-backdrop="static" data-keyboard="false">
        <p class="text-center">Suppression de l'utilisateur en cours.<br>Ne fermez pas votre navigateur.</p>
        <div class="text-center">
          <loading-progress
            indeterminate
            hide-background
            size="32"
            rotate
            fillDuration="2"
            rotationDuration="1"
          />
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import CustomScrollbar from 'vue-custom-scrollbar';
import UserForm from '@/components/form/UserForm';
import User from '@/components/User';
import Modal from '@/components/Modal';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: { User, UserForm, CustomScrollbar, Modal },
  computed: {
    ...mapGetters({
      users: 'users/users',
      plans: 'plans/plans',
      isAdmin: 'auth/isAdmin',
      isFetching: 'users/isFetching',
      currentUser: 'auth/user'
    }),
    columns() {
      const columns = [
        { label: 'Nom', field: 'lastname', filterable: false },
        { label: 'Prénom', field: 'firstname', filterable: false },
        { label: 'E-mail', field: 'email' },
        { label: 'Rôle', field: 'userRole', filterable: false },
        { label: 'Crédits', field: 'credits', filterable: false }
      ];
      if (!this.isAdmin) return columns;
      // add edit button
      return [
        ...columns,
        { label: '', representedAs: () => '', filterable: false }
      ];
    }
  },
  mounted() {
    this.getUsers().catch(() => this.$eventBus.$emit('fetch-data-error'));
    if (this.isAdmin) this.getPlans();
  },
  data() {
    return {
      filter: '',
      error: null,
      statusMessage: '',
      page: 1,
      per_page: 10,
      user: null,
      userToDelete: null,
      settings: {
        suppressScrollX: true,
        swipeEasing: true
      }
    };
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getAllUsers',
      deleteUser: 'users/deleteUser',
      getPlans: 'plans/getPlans',
      updateAnyUser: 'users/updateAnyUser'
    }),
    ...mapMutations({
      updateUserInfos: 'users/UPDATE_USER_INFOS',
      updateOwnInfos: 'auth/UPDATE_OWN_INFOS'
    }),
    editUser(user) {
      this.user = user;
      this.success = '';
      this.error = null;
      this.$jQuery('#edit-user').modal('show');
    },
    showDeleteUserModal(user) {
      this.userToDelete = user;
      this.$jQuery('#confirm-user-delete').modal('show');
    },
    confirmDeleteUser() {
      this.$jQuery('#confirm-user-delete').modal('hide');
      this.$jQuery('#delete-user-pending-message').modal('show');
      document.body.classList.add('deletion-in-progress');

      this.deleteUser(this.userToDelete.id)
        .catch(error => setTimeout(() => this.$eventBus.$emit('fetch-data-error', error), 600))
        .finally(() => {
          setTimeout(() => this.$jQuery('#delete-user-pending-message').modal('hide'), 500);
          document.body.classList.remove('deletion-in-progress');
        });
    },
    onSubmit(user) {
      if (this.isAdmin) {
        this.updateAnyUser(user)
          .then(() => {
            this.statusMessage = 'Modifications enregistrées !';
            this.error = null;
            this.updateUserInfos(user);
            if (user.userId === this.currentUser.id) this.updateOwnInfos(user);
          })
          .catch((error) => {
            this.statusMessage = '';
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

#edit-user .modal-body {
  padding: 0;
}
</style>
