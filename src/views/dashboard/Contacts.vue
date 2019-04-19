<template>
  <div class="row">
    <div class="col-lg-4">
      <div class="card">
        <div class="p-3">
          <form @submit.prevent="updateListName">
            <div class="input-group mb-3">
              <input type="text" class="form-control" aria-label="Recipient's username" v-model="name">
              <div class="input-group-append">
                <v-btn icon="fas fa-check" color="success" type="submit"></v-btn>
              </div>
            </div>
          </form>
          <div v-if="countContacts" class="d-flex align-items-center justify-content-center mb-2">
            <span class="badge badge-default mr-1">{{ countContacts }}</span>
            <small>{{ $tc('numberOfLines', countContacts) }}</small>
          </div>
          <p class="text-center">Créé le {{ '20190412 14:00:00' | full }}</p>
          <alert class="text-center mb-4" color="secondary">Non vérifié</alert>
          <div class="compose">
            <!-- <button type="button" class="btn btn-primary btn-lg btn-block">Composer un SMS</button> -->
            <button class="btn btn-icon btn-primary btn-block" type="button" @click="compose">
              <span class="btn-inner--icon"><i class="fas fa-pencil-alt"></i></span>
              <span class="btn-inner--text">Composer un SMS</span>
            </button>
            <p class="text-center mt-3">Seul les numéros valides, non STOP-SMS et actifs seront envoyés.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <div class="p-3">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Actions
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" @click.prevent="deleteContacts">Supprimer</a>
              <a class="dropdown-item" href="#" @click.prevent>Activer/Désactiver</a>
            </div>
          </div>
          <v-btn color="primary" icon="fas fa-plus-square" @click.native="add">Ajouter un contact</v-btn>
        </div>
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
            <contact v-for="contact in contacts" :contact="contact" :key="contact.id" :delete-click-callback="onDelete">
              <div slot="foobar" class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :id="`contact-${contact.id}`" :value="contact.id" v-model="selectedContacts">
                <label class="custom-control-label" :for="`contact-${contact.id}`"></label>
              </div>
            </contact>
            <tr v-if="contacts.length === 0">
              <td colspan="3">
                <div class="text-sm text-center">Aucun contact</div>
              </td>
            </tr>
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
      updateListName: 'lists/updateListName',
      remove: 'contacts/removeContact',
      addContacts: 'contacts/addContacts'
    }),
    ...mapMutations({
      updateContacts: 'contacts/UPDATE_CONTACTS'
    }),
    updateListName () {
      const { name } = this;
      this.updateListName({ id: this.$route.params.listId, name });
    },
    onDelete ({ id }) {
      this.deleteContact(id);
    },
    deleteContacts () {
      this.selectedContacts.forEach(id => this.deleteContact(id));
    },
    // delete a contact from a list
    deleteContact (id) {
      this.remove({
        listId: this.$route.params.listId,
        contactId: id
      })
        .then(() => {
          this.updateContacts(this.contacts.filter(contact => contact.id !== id));
        });
    },
    // compose an SMS
    compose () {
      this.$router.push({ name: 'message.redaction', query: { listId: this.$route.params.listId } });
    },
    add () {
      this.addContacts({
        listId: 2,
        contacts: [
          {
            telephone: '+33626835621',
            firstname: 'John',
            lastname: 'Doe',
            attributes: []
          },
          {
            telephone: '+33626835622',
            firstname: 'John',
            lastname: 'Doe',
            attributes: []
          },
          {
            telephone: '+33626835623',
            firstname: 'John',
            lastname: 'Doe',
            attributes: []
          }
        ]
      });
    }
  }
};
</script>
