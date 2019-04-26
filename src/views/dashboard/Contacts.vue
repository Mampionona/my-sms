<template>
  <div class="row">
    <div class="col-lg-3">
      <div class="card">
        <div class="p-3">
          <form @submit.prevent="updateListName">
            <div class="input-group">
              <input type="text" class="form-control" aria-label="Recipient's username" v-model="name" placeholder="Nom du fichier">
              <div class="input-group-append">
                <v-btn icon="fas fa-check" color="success" type="submit"></v-btn>
              </div>
            </div>
            <p v-if="updateTextStatus" :class="updateTextClass">{{ updateTextStatus }}</p>
          </form>
          <div v-if="countContacts" class="d-flex align-items-center justify-content-center mt-3">
            <span class="badge badge-default mr-1">{{ countContacts }}</span>
            <small>{{ $tc('numberOfLines', countContacts) }}</small>
          </div>
          <p v-if="list" class="text-center mt-2">Créé le {{ list.updateDate | full }}</p>
          <div class="compose">
            <button class="btn btn-icon btn-primary btn-block" type="button" @click="$router.push(composeUrl)">
              <span class="btn-inner--icon"><i class="fas fa-pencil-alt"></i></span>
              <span class="btn-inner--text">Composer un SMS</span>
            </button>
            <p class="text-center mt-3">Seul les numéros valides, non STOP-SMS et actifs seront envoyés.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="card">
        <div class="p-3">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Actions
            </button>
            <div class="dropdown-menu" aria-labelledby="actions">
              <a class="dropdown-item" href="#" @click.prevent="deleteContacts">Supprimer</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="filtres" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filtres
            </button>
            <div class="dropdown-menu" aria-labelledby="filtres">
              <a class="dropdown-item" href="#" @click.prevent>Aucun filtre</a>
              <a class="dropdown-item" href="#" @click.prevent>Voir les STOP SMS</a>
              <a class="dropdown-item" href="#" @click.prevent>Voir les formats invalides</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="export" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-download"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="export">
              <a class="dropdown-item" href="#" @click.prevent>Export CSV</a>
            </div>
          </div>
        </div>
        <v-table>
          <thead class="thead-light">
            <tr>
              <th>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="all-contacts" v-model="allContacts">
                  <label class="custom-control-label" for="all-contacts"></label>
                </div>
              </th>
              <th scope="col">Téléphone</th>
              <th scope="col">Nom</th>
              <th scope="col">Prénom</th>
              <th>Paramètres</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="list">
            <contact v-for="contact in contacts" :contact="contact" :key="contact.id" :delete-click-callback="onDelete">
              <div slot="checkbox" class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :id="`contact-${contact.id}`" :value="contact.id" v-model="selectedContacts">
                <label class="custom-control-label" :for="`contact-${contact.id}`"></label>
              </div>
            </contact>
            <tr v-if="contacts.length === 0">
              <td colspan="6">
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
import { mapActions, mapGetters, mapMutations } from 'vuex';
import store from '@/store';

export default {
  components: { vTable, Contact, vBtn },
  data () {
    return {
      allContacts: false,
      selectedContacts: [],
      name: '',
      list: null,
      updateSuccess: false,
      updateError: false,
      updateTextStatus: ''
    };
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('lists/getUserLists').then(lists => lists.forEach(list => {
      if (list.id == to.params.listId) {
        next(vm => vm.setData(list));
      }
    }));
  },
  mounted () {
    // dispatch an action to get contacts of a list
    this.getContacts(this.$route.params.listId);
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts/contacts',
      countContacts: 'contacts/count'
    }),
    composeUrl () {
      return {
        name: 'create_campaign',
        query: { listId: this.$route.params.listId }
      };
    },
    updateTextClass () {
      return {
        'font-weight-bold': true,
        'small': true,
        'mb-0': true,
        'text-success': this.updateSuccess,
        'text-danger': this.updateError
      };
    }
  },
  watch: {
    allContacts (isChecked) {
      if (isChecked) {
        this.contacts.forEach(contact => this.selectedContacts.push(contact.id));
        return;
      }
      this.selectedContacts = [];
    }
  },
  methods: {
    ...mapActions({
      getContacts: 'contacts/getContactsOfList',
      update: 'lists/updateListName',
      remove: 'contacts/removeContact'
    }),
    ...mapMutations({
      updateContacts: 'contacts/UPDATE_CONTACTS'
    }),
    setData (list) {
      this.list = list;
      this.name = list.name;
    },
    updateListName () {
      const { name } = this;
      this.update({ id: this.$route.params.listId, name })
        .then(() => {
          this.updateTextStatus = 'Nom du fichier modifié !';
          this.updateSuccess = true;
          this.updateError = false;
        })
        .catch(() => {
          this.updateTextStatus = 'Le nom du fichier ne peut pas dépasser 50 caractères';
          this.updateSuccess = false;
          this.updateError = true;
        });
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
          // update contacts array
          this.updateContacts(this.contacts.filter(contact => contact.id !== id));
          // uncheck select all
          if (this.contacts.length === 0) {
            this.allContacts = false;
          }
        });
    }
  }
};
</script>
