<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <datatable :columns="columns" :data="lists" class="vertical-align-middle">
          <template slot-scope="{ row }">
            <list
              :list="row"
              :key="row.id"
              @delete-list="showConfirmModal"
              @show-list="showList"
            />
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
              {{ $t('Aucun fichier') }}
            </template>
          </div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
      <modal
        id="confirm-list-delete"
        @accept="deleteFile"
        accept-button
        accept-button-label="Supprimer"
        cancel-button
        cancel-button-label="Non"
      >
        <i18n path="Etes-vous sûr de vouloir supprimer le fichier" class="mb-0" tag="p">
          <strong>{{ filename }}</strong>
        </i18n>
      </modal>
      <modal id="delete-file-pending-message">
        <p class="text-center">Suppression du fichier en cours.<br>Ne fermez pas votre navigateur.</p>
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
import List from '@/components/List';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Modal from '@/components/Modal';

export default {
  components: { List, Modal },
  data() {
    return {
      page: 1,
      per_page: 10,
      columns: [
        { label: 'Fichiers', field: 'name' },
        { label: 'Contacts actifs', field: 'contacts' },
        { label: 'STOP', field: '' },
        { label: 'Créé le', field: 'updateDate' },
        { label: '', representedAs: () => '' }
      ],
      filename: '',
      deleteId: null
    };
  },
  mounted() {
    // dispatch get user's lists action
    this.getUserLists().catch(() => this.$eventBus.$emit('fetch-data-error'));
  },
  computed: {
    ...mapGetters({
      lists: 'lists/lists',
      isFetching: 'lists/isFetching'
    })
  },
  methods: {
    ...mapActions({
      getUserLists: 'lists/getUserLists',
      deleteList: 'lists/deleteList'
    }),
    ...mapMutations({
      updateLists: 'lists/UPDATE_LIST'
    }),
    showConfirmModal({ id, name }) {
      this.filename = name;
      this.deleteId = id;
      this.$jQuery('#confirm-list-delete').modal('show');
    },
    deleteFile() {
      document.body.classList.add('deletion-in-progress');
      this.$jQuery('#confirm-list-delete').modal('hide');
      this.$jQuery('#delete-file-pending-message').modal('show');

      this.deleteList(this.deleteId)
        .then(() => {
          const newLists = this.lists.filter(({ id }) => id !== this.deleteId);
          this.updateLists(newLists);
        })
        .catch(error => setTimeout(() => this.$eventBus.$emit('fetch-data-error', error), 600))
        .finally(() => {
          this.$jQuery('#delete-file-pending-message').modal('hide');
          setTimeout(() => this.$jQuery('#delete-file-pending-message').modal('hide'), 500);
          document.body.classList.remove('deletion-in-progress');
        });
    },
    showList(listId) {
      this.$router.push({ name: 'contacts', params: { listId } });
    }
  }
};
</script>
