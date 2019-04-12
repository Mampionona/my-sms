<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header border-0">
          <h3 class="mb-0">Liste des contacts</h3>
        </div>
        <v-table>
          <thead class="thead-light">
            <tr>
              <th scope="col">Fichiers</th>
              <th scope="col">Contacts actifs</th>
              <th scope="col">Créé le</th>
              <th scope="col">Vérifié le</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <List v-for="list in lists" :list="list" :key="list.id"/>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import List from '@/components/List';
import { mapActions, mapGetters } from 'vuex';

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
      getUserLists: 'lists/getUserLists'
    })
  }
};
</script>
