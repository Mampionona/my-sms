<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header border-0">
          <div class="mb-5">
            <router-link :to="{ name: 'list.import' }" class="btn btn-primary">Importer des contacts</router-link>
          </div>
          <form @submit.prevent="search">
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <div>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="search-label"><i class="fas fa-search"></i></span>
                    </div>
                    <input v-model="number" type="text" class="form-control" placeholder="Rechercher un numéro" aria-label="Rechercher un numéro" aria-describedby="search-label">
                  </div>
                </div>
                <v-btn color="primary" icon="fas fa-search">Rechercher</v-btn>
              </div>              
            </div>
          </form>
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
import vBtn from '@/components/vBtn';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { vTable, List, vBtn },
  data () {
    return {
      number: ''
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
      getUserLists: 'lists/getUserLists'
    }),
    search () {
      alert('searching ' + this.number)
    }
  }
};
</script>
