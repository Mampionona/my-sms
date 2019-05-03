<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header border-0">
          <router-link :to="{ name: 'import_file' }" class="btn btn-primary">Importer des contacts</router-link>
        </div>
        <datatable :columns="columns" :data="lists">
          <template slot-scope="{ row }">
            <list
              :list="row"
              :key="row.id"
              :delete-click-callback="onDelete"
              :show-click-callback="onShow"
            />
          </template>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
      </div>
    </div>
  </div>
</template>
<script>
import List from '@/components/List';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: { List },
  data () {
    return {
      page: 1,
      per_page: 10,
      columns: [
        { label: 'Fichiers', field: 'name' },
        { label: 'Contacts actifs', field: 'contacts' },
        { label: 'Créé le', field: 'updateDate' },
        { label: '', representedAs: (row) => '' }
      ]
    };
  },
  mounted () {
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
    onDelete(listId) {
      if (confirm('Attention ! Les contacts rattachés à cette liste seront aussi supprimés.')) {
        this.deleteList(listId).then(() => {
          const newLists = this.lists.filter(({ id }) => id !== listId);
          this.updateLists(newLists);
        });
      }
    },
    onShow(listId) {
      this.$router.push({ name: 'contacts', params: { listId } });
    }
  }
};
</script>
