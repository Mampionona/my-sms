<template>
  <div class="row">
    <div class="col-lg-3">
      <div class="card">
        <div class="p-3">
          <form @submit.prevent="updateListName">
            <div class="input-group">
              <input type="text" class="form-control" aria-label="Recipient's username" v-model="name" :placeholder="`${$t('Nom du fichier')}`">
              <div class="input-group-append">
                <v-btn icon="fas fa-check" color="success" type="submit"></v-btn>
              </div>
            </div>
            <p v-if="updateTextStatus" :class="updateTextClass">{{ $t(updateTextStatus) }}</p>
          </form>
          <div v-if="countContacts" class="d-flex align-items-center justify-content-center mt-3">
            <span class="badge badge-default mr-1">{{ countContacts }}</span>
            <small>{{ $tc('numberOfLines', countContacts) }}</small>
          </div>
          <i18n tag="p" v-if="list" class="text-center mt-2" path="Créé le">
            {{ list.updateDate | full }}
          </i18n>
          <div class="compose">
            <button class="btn btn-icon btn-primary btn-block" type="button" @click="$router.push(composeUrl)">
              <span class="btn-inner--icon"><i class="fas fa-pencil-alt"></i></span>
              <span class="btn-inner--text">{{ $t('Composer un SMS') }}</span>
            </button>
            <p class="text-center mt-3">{{ $t('Seul les numéros valides et non STOP-SMS seront envoyés.') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-9">
      <div class="card">
        <div class="p-3">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="actions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ $t('Actions') }}
            </button>
            <div class="dropdown-menu" aria-labelledby="actions">
              <a class="dropdown-item" href="#" @click.prevent="deleteContacts">{{ $t('Supprimer') }}</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="filtres" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ $t('Filtres') }}
            </button>
            <div class="dropdown-menu" aria-labelledby="filtres">
              <a class="dropdown-item" href="#" @click.prevent="toggleStopsOnly">{{ $t('Aucun filtre') }}</a>
              <a class="dropdown-item" href="#" @click.prevent="toggleStopsOnly">{{ $t('Voir les STOP SMS') }}</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="export" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-download"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="export">
              <a class="dropdown-item" href="#" @click.prevent="exportCSV">{{ $t('Export CSV') }}</a>
            </div>
          </div>
        </div>
        <!-- this is used to force component refresh as vm.$forceUpdate() won't refresh children components -->
        <div v-if="showTable">
            <datatable :columns="columns" :data="getData" class="vertical-align-middle">
              <template slot-scope="{ row }">
                <contact :contact="row" :key="row.id" @delete-contact="confirmDelete">
                  <div slot="checkbox" class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" :id="`contact-${row.id}`" :value="row.id" v-model="selectedContacts">
                    <label class="custom-control-label" :for="`contact-${row.id}`"></label>
                  </div>
                </contact>
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
                  {{ $t('Aucun contact trouvé') }}
                </template>
              </div>
            </datatable>
            <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
        </div>
        <modal
          id="confirm-contact-delete"
          accept-button
          :accept-button-label="`${$t('Supprimer')}`"
          cancel-button
          :cancel-button-label="`${$t('Non')}`"
          @accept="deleteContact"
        >
          <i18n class="mb-0" path="Voulez-vous effacer le numéro" tag="p">
            <strong>{{ telephone }}</strong>
          </i18n>
        </modal>
      </div>
    </div>
  </div>
</template>
<script>
import Contact from '@/components/Contact';
import vBtn from '@/components/vBtn';
import SelectAll from '@/components/SelectAll';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { arrayToCSV } from '@/utils';
import Modal from '@/components/Modal';

export default {
  components: { Contact, vBtn, Modal },
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
      showTable: true,
      countContacts: 0,
      updateSuccess: false,
      updateError: false,
      updateTextStatus: '',
      telephone: '',
      deleteId: null
    };
  },
  mounted() {
    document.getElementById('all-contacts').addEventListener('change', (e) => {
      if (e.target.checked) {
        this.contacts.forEach(contact => this.selectedContacts.push(contact.id));
        return;
      }
      this.selectedContacts = [];
    });

    this.getLists().then(lists => lists.forEach((list) => {
      const { id, name, contacts, stops } = list;
      if (id === parseInt(this.$route.params.listId, 10)) {
        this.list = list;
        this.name = name;
        this.countContacts = contacts;
        this.$stops = stops;
      }
    }));
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts/contacts',
      isFetching: 'contacts/isFetching'
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
      getStopContacts: 'contacts/getStopContactsOfList',
      getAllContacts: 'contacts/getAllContacts',
      update: 'lists/updateListName',
      remove: 'contacts/removeContact',
      getLists: 'lists/getUserLists'
    }),
    ...mapMutations({
      updateContacts: 'contacts/UPDATE_CONTACTS'
    }),
    getData(params, setRowData) {
      if (this.$stopsOnly) {
        this.getStopContacts({ listId: this.$route.params.listId, page: params.page_number }).then((contacts) => {
          setRowData(contacts, this.$stops);
        })
          .catch(error => this.$eventBus.$emit('fetch-data-error', error));
      }

      else {
        this.getContacts({ listId: this.$route.params.listId, page: params.page_number }).then((contacts) => {
          setRowData(contacts, this.countContacts);
        })
          .catch(error => this.$eventBus.$emit('fetch-data-error', error));
      }
    },
    toggleStopsOnly() {
      this.$stopsOnly = !this.$stopsOnly;
      this.showTable = false;
      this.$nextTick(() => {
        this.showTable = true;
      });
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
            this.showTable = false;
            this.updateContacts(this.contacts.filter(contact => contact.id !== id));

            this.$nextTick(() => {
              this.showTable = true;
            });

            // uncheck select all
            if (this.contacts.length === 0) this.allContacts = false;
            resolve();
          });
      });
    },
    exportCSV() {
      // Export contacts into CSV file
      this.getAllContacts(this.$route.params.listId).then(contacts => arrayToCSV(contacts, this.list.name));
    }
  }
};
</script>
