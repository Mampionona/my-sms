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
              <a class="dropdown-item" href="#" @click.prevent="exportCSV">Export CSV</a>
            </div>
          </div>
        </div>
        <datatable :columns="columns" :data="contacts">
          <template slot-scope="{ row }">
            <contact :contact="row" :key="row.id" @delete-contact="confirmDelete">
              <div slot="checkbox" class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :id="`contact-${row.id}`" :value="row.id" v-model="selectedContacts">
                <label class="custom-control-label" :for="`contact-${row.id}`"></label>
              </div>
            </contact>
          </template>
          <div slot="no-results" class="text-center">Aucun contact trouvé</div>
        </datatable>
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
        <div class="modal fade" id="confirm-contact-delete" tabindex="-1" role="dialog" aria-labelledby="confirm-contact-delete-label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <p class="mb-0">Voulez-vous effacer le numéro <strong>{{ telephone }} ?</strong></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary" @click="deleteContact">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Contact from '@/components/Contact';
import vBtn from '@/components/vBtn';
import SelectAll from '@/components/SelectAll';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import store from '@/store';
import { arrayToCSV } from '@/utils';

export default {
  components: { Contact, vBtn },
  data() {
    return {
      columns: [
        { label: '', headerComponent: SelectAll },
        { label: 'Téléphone', field: 'telephone' },
        { label: 'Nom', field: 'lastname' },
        { label: 'Prénom', field: 'firstname' },
        { label: 'Paramètres', field: 'attributes' },
        { label: '', representedAs: () => '' }
      ],
      page: 1,
      per_page: 10,
      allContacts: false,
      selectedContacts: [],
      name: '',
      list: null,
      updateSuccess: false,
      updateError: false,
      updateTextStatus: '',
      telephone: '',
      deleteId: null
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('lists/getUserLists').then(lists => lists.forEach((list) => {
      if (list.id === parseInt(to.params.listId, 10)) { // precise intent
        next(vm => vm.setData(list));
      }
    }));
  },
  mounted() {
    // dispatch an action to get contacts of a list
    this.getContacts(this.$route.params.listId);
    document.getElementById('all-contacts').addEventListener('change', (e) => {
      if (e.target.checked) {
        this.contacts.forEach(contact => this.selectedContacts.push(contact.id));
        return;
      }
      this.selectedContacts = [];
    });
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts/contacts',
      countContacts: 'contacts/count'
    }),
    composeUrl() {
      return {
        name: 'create_campaign',
        query: { listId: this.$route.params.listId }
      };
    },
    updateTextClass() {
      return {
        'font-weight-bold': true,
        small: true,
        'mb-0': true,
        'text-success': this.updateSuccess,
        'text-danger': this.updateError
      };
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
    setData(list) {
      this.list = list;
      this.name = list.name;
    },
    updateListName() {
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
    confirmDelete({ id, telephone }) {
      this.deleteId = id;
      this.telephone = telephone;
      this.$jQuery('#confirm-contact-delete').modal('show');
    },
    deleteContact() {
      this.delete(this.deleteId).then(() => {
        this.$jQuery('#confirm-contact-delete').modal('hide');
      });
    },
    deleteContacts() {
      this.selectedContacts.forEach(id => this.delete(id));
    },
    // delete a contact from a list
    delete(id) {
      return new Promise((resolve) => {
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
            resolve();
          });
      });
    },
    exportCSV() {
      // Export contacts into CSV file
      arrayToCSV(this.contacts, this.list.name);
    }
  }
};
</script>
