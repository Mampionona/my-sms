<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card">
        <div class="p-3">
          <form @submit.prevent="onSubmit">
            <div class="input-group mb-3">
              <input type="text" class="form-control" aria-label="Recipient's username" v-model="name">
              <div class="input-group-append">
                <v-btn icon="fas fa-check" color="success" type="submit"></v-btn>
              </div>
            </div>
          </form>
          <div v-if="countContacts" class="d-flex align-items-center justify-content-center mb-2">
            <span class="badge badge-default mr-1">{{ countContacts }}</span>
            <small>lignes</small>
          </div>
          <p class="text-center">Créé le {{ '20190412 14:00:00' | full }}</p>
          <alert class="text-center" color="secondary">Non vérifié</alert>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <v-table>
          <thead class="thead-light">
            <tr>
              <th>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="all-contacts" v-model="all">
                  <label class="custom-control-label" for="all-contacts"></label>
                </div>
              </th>
              <th scope="col">Téléphone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody class="list">
            <contact v-for="contact in contacts" :contact="contact" :key="contact.id">
              <div slot="foobar" class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :id="`contact-${contact.id}`" :value="contact.id" v-model="selectedContacts">
                <label class="custom-control-label" :for="`contact-${contact.id}`"></label>
              </div>
            </contact>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import vTable from '@/components/vTable';
import Contact from '@/components/Contact';
import vBtn from '@/components/vBtn';
import Alert from '@/components/Alert';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { vTable, Contact, vBtn, Alert },
  data () {
    return {
      all: false,
      selectedContacts: [],
      name: ''
    };
  },
  mounted () {
    // dispatch an action to get contacts of a list
    this.getContacts(this.$route.params.listId);
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts/contacts',
      countContacts: 'contacts/count'
    })
  },
  methods: {
    ...mapActions({
      getContacts: 'contacts/getContactsOfList',
      updateListName: 'lists/updateListName'
    }),
    onSubmit () {
      const { name } = this;
      this.updateListName({ id: this.$route.params.listId, name });
    }
  }
};
</script>
