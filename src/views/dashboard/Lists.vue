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
          <div slot="no-results" class="text-center">Aucun fichier</div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>

      <div class="modal fade" id="confirm-list-delete" tabindex="-1" role="dialog" aria-labelledby="confirm-list-delete-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <p class="mb-0">Etes-vous sûr de vouloir supprimer le fichier <strong>{{ filename }} ?</strong></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
              <button type="button" class="btn btn-primary" @click="deleteFile">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import List from '@/components/List';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: { List },
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
    this.getUserLists();
  },
  computed: {
    ...mapGetters({
      lists: 'lists/lists'
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
      if (this.deleteId) {
        this.deleteList(this.deleteId).then(() => {
          const newLists = this.lists.filter(({ id }) => id !== this.deleteId);
          this.updateLists(newLists);
          this.$jQuery('#confirm-list-delete').modal('hide');
        });
      }
    },
    showList(listId) {
      this.$router.push({ name: 'contacts', params: { listId } });
    }
  }
};
</script>
