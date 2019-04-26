<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header border-0">
          <router-link :to="{ name: 'import_file' }" class="btn btn-primary">Importer des contacts</router-link>
        </div>
        <v-table>
          <thead class="thead-light">
            <tr>
              <th scope="col">Fichiers</th>
              <th scope="col">Contacts actifs</th>
              <th scope="col">Créé le</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <list
              v-for="list in lists"
              :list="list"
              :key="list.id"
              :delete-click-callback="onDelete"
              :show-click-callback="onShow"
            />
            <tr v-if="lists.length === 0">
              <td colspan="4" class="text-center text-sm">Aucun fichier</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import List from '@/components/List';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: { vTable, List },
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
    onDelete (listId) {
      if (confirm('Attention ! Les contacts rattachés à cette liste sera aussi supprimés.')) {
        this.deleteList(listId).then(() => {
          const newLists = this.lists.filter(({ id }) => id !== listId);
          this.updateLists(newLists);
        });
      }
    },
    onShow (listId) {
      this.$router.push({ name: 'contacts', params: { listId } });
    }
  }
};
</script>
