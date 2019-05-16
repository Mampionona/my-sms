<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="mb-4 position-relative">
            <div class="dropzone dropzone-multiple dz-clickable" data-toggle="dropzone" @drop.stop.prevent="handleFiles($event)" @dragenter.stop.prevent @dragover.stop.prevent>
              <ul v-if="isParsed" class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
                <li class="list-group-item px-0 dz-processing">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <div class="avatar">
                        <i class="fas fa-file-csv"></i>
                      </div>
                    </div>
                    <div class="col-auto ml--3">
                      <h4 class="mb-1">{{ filename }}</h4>
                      <p class="small text-muted mb-0" data-dz-size=""><strong>{{ lines | formatNumber }}</strong> lignes</p>
                    </div>
                    <div class="col-auto ml-3">
                      <a href="#" @click.prevent="dismissFile">
                        <i class="fas fa-trash-alt"></i>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="dz-default dz-message">
                <div>Glisser et déposer votre fichier</div>
                <div class="my-2">Ou</div>
                <div>
                  <label class="btn btn-icon btn-primary">
                    <span class="btn-inner--icon">
                      <i class="fas fa-download"></i>
                    </span>
                    <span class="btn-inner--text d-none d-sm-inline">Sélectionner votre fichier</span>
                    <input type="file" hidden ref="csv">
                  </label>
                </div>
              </div>
            </div>
            <div v-if="isParsing" class="loader position-absolute top-0 left-0 h-100 w-100 d-flex justify-content-center align-items-center flex-column">
              <loading-progress
                indeterminate
                hide-background
                size="32"
                rotate
                fillDuration="2"
                rotationDuration="1"
              />
              <div class="text-primary">Lecture du fichier CSV/Excel en cours...</div>
            </div>
          </div>
          <alert v-if="errorMessage.length > 0" class="mb-4" color="danger" icon="fas fa-exclamation-triangle">
            <ul class="pl-0 mb-0 pl-4 error-message">
              <li v-for="(message, index) in errorMessage" :key="index">{{ message }}</li>
            </ul>
          </alert>
          <div class="form-group">
            <label for="import-where" class="form-control-label">Importer les contacts</label>
            <select id="import-where" class="form-control" v-model="destination">
              <option value="new">dans une nouvelle liste</option>
              <option value="list">dans une liste déjà existante</option>
            </select>
          </div>
          <div v-if="destination === 'list'" class="form-group">
            <label class="form-control-label">Sélectionner un fichier</label>
            <model-list-select
              :list="lists"
              option-value="id"
              option-text="name"
              v-model="listId"
              placeholder="Sélectionner un fichier"
            ></model-list-select>
          </div>
          <div v-else class="form-group">
            <label for="custom-name" class="form-control-label">Nommez le nom du fichier</label>
            <input class="form-control" type="text" id="custom-name" v-model="customName">
          </div>
          <div class="alert alert-secondary mt-5" role="alert">
            <ul class="mb-0">
              <li><p>La première ligne du fichier doit être le nom des colonnes.</p></li>
              <li><p>La liste des contacts doit être au format Excel ou CSV</p></li>
              <li><p>Pour un fichier CSV le séparateur doit être le point-virgule et l'encoding UTF-8</p></li>
              <li><p>Le fichier doit contenir au minimum 1 colonne avec les numéros de portable</p></li>
              <li><p>Le nombre de lignes du fichier doit être au maximum de {{ countMaxLines | formatNumber }} et au minimum de {{ countMinLines | formatNumber }}.</p></li>
            </ul>
          </div>
          <div class="alert" role="alert">
            <p><strong>Nos exemples</strong></p>
            <ul class="mb-0">
              <li><p>Téléchargez un exemple de fichier simple <a :href="`${publicPath}exemples/contact-simple.csv`" class="exemple-csv">CSV</a></p></li>
              <li><p>Téléchargez un exemple de fichier avec variables <a :href="`${publicPath}exemples/contact-variable.csv`" class="exemple-csv">CSV</a></p></li>
              <li><p>Téléchargez un exemple de fichier simple <a :href="`${publicPath}exemples/contact-simple.xls`" class="exemple-csv">XLS</a></p></li>
              <li><p>Téléchargez un exemple de fichier avec variables <a :href="`${publicPath}exemples/contact-variable.xls`" class="exemple-csv">XLS</a></p></li>
            </ul>
          </div>
          <div class="alert">
            <div class="custom-control custom-checkbox">
              <p>
                <input type="checkbox" class="custom-control-input" id="certify" v-model="certify">
                <label class="custom-control-label" for="certify">Je certifie que :</label>
              </p>
            </div>
            <ul class="mb-0">
              <li><p>J'ai obtenu de tous mes contacts le consentement libre et spécifique à leur envoyer des SMS.</p></li>
              <li><p>Aucun de mes contacts n'a été acquis via des listes de diffusion tierces.</p></li>
              <!-- <li><p>J'inclurai la mention <strong>STOP au 36105</strong> dans toute campagne marketing.</p></li> -->
              <li><p>Je n'enverrai avec My SMS que des informations légales et légitimes.</p></li>
            </ul>
          </div>
          <alert v-if="hasError" color="danger" icon="fas fa-exclamation-triangle" class="mb-5">
            <ul class="mb-0 px-3">
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </alert>
          <div class="text-right">
            <button class="btn-primary btn" @click.prevent="importWorkbook">Télécharger le fichier</button>
          </div>
        </div>
      </div>
      <modal id="import-error-modal" cancel-button cancel-button-label="Fermer">
        <p class="mb-0">{{ modalBody }}</p>
      </modal>
      <modal id="import-progress" data-backdrop="static" data-keyboard="false">
        <p class="mb-5">Importation des contacts en cours.<br>Ne fermez pas votre navigateur.</p>
        <div class="progress progress-xs mb-0">
          <div
            class="progress-bar bg-dark"
            role="progressbar"
            :aria-valuenow="progressPercent"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="progressBarWidth"
          ></div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
import Alert from '@/components/Alert';
import { ModelListSelect } from 'vue-search-select';
import { validFileExtensions, workbookToArray, COUNT_MAX_LINES, COUNT_MIN_LINES } from '@/utils';
import { mapActions, mapGetters } from 'vuex';
import Modal from '@/components/Modal';

export default {
  components: { Alert, ModelListSelect, Modal },
  computed: {
    ...mapGetters({ lists: 'lists/lists' }),
    hasError() {
      return Object.keys(this.errors).length > 0;
    },
    progressBarWidth() {
      return { width: `${this.progressPercent}%` };
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      certify: false,
      filename: '',
      contacts: [],
      selectedFile: false,
      errorMessage: [],
      customName: '',
      countMaxLines: COUNT_MAX_LINES,
      countMinLines: COUNT_MIN_LINES,
      errors: [],
      modalBody: '',
      listId: null,
      destination: 'new',
      isParsing: false,
      isParsed: false,
      lines: 0,
      progressPercent: 0
    };
  },
  mounted() {
    this.getLists();
    this.$refs.csv.addEventListener('change', this.handleFiles, false);
  },
  methods: {
    ...mapActions({
      addContacts: 'contacts/addContacts',
      createNewList: 'lists/createNewList',
      getLists: 'lists/getUserLists'
    }),
    handleFiles(event) {
      const { files } = event.type === 'drop' ? event.dataTransfer : event.target;
      this.prepareImport(files);
    },
    prepareImport(files) {
      this.contacts = [];
      if (files.length > 0) {
        const file = files[0];
        this.filename = file.name;
        // get file extension
        const fileExtension = file.name.substring(file.name.lastIndexOf('.'));

        if (!validFileExtensions.includes(fileExtension.toLowerCase())) {
          this.errorMessage.push('Les contacts doivent être enregistrés au format .xls, .xlsx ou .csv.');
          return;
        }

        this.isParsing = true;
        this.isParsed = false;

        workbookToArray(file)
          .then(({ contacts, count }) => {
            this.lines = count;
            this.contacts = Object.freeze(contacts);
            this.errorMessage = [];
            this.isParsing = false;
            this.isParsed = true;
          })
          .catch((error) => {
            this.errorMessage = error;
            this.isParsing = false;
            this.isParsed = false;
          });
      }
    },
    importWorkbook() {
      const { customName, filename, contacts, certify } = this;
      const len = contacts.length;

      this.errors = [];
      if (len === 0 && this.destination === 'new') this.errors.push('Aucun fichier sélectionné');
      if (this.destination === 'list' && !this.listId) this.errors.push('Vous devez choisir une liste déjà existante');
      if (!certify) this.errors.push('Vous devez accepter les politiques de téléchargement du fichier');
      if (this.hasError) return;
      this.$jQuery('#import-progress').modal('show');
      if (this.destination === 'new') {
        this.createNewList({ name: customName || filename })
          .then(({ id }) => this.addContactsToAList(id, contacts))
          .finally(() => {
            this.errors = [];
          });
      }
      else this.addContactsToAList(this.listId, contacts);
    },
    addContactsToAList(listId, $contacts) {
      const len = $contacts.length;
      let counter = 0;
      const saveContacts = (_counter) => {
        this.addContacts({ listId, contacts: $contacts[_counter], onUploadProgress: this.onUploadProgress })
          .then(() => {
            counter++;
            if (counter < len) saveContacts(counter);
            if (counter === len) {
              this.$jQuery('#import-progress').modal('hide');
              this.$router.push({ name: 'contacts', params: { listId } });
            }
          })
          .catch((error) => {
            if (error) {
              const { status, data } = error;
              // Only for 4xx error
              if (String(status).charAt(0) === '4') {
                this.$jQuery('#import-progress').modal('hide');
                this.modalBody = data.error;
                this.$jQuery('#import-error-modal').modal('show');
              }
            }
          });
      };

      saveContacts(counter);
    },
    onUploadProgress({ lengthComputable, loaded, total }) {
      if (!lengthComputable) return;
      this.progressPercent = (loaded / total) * 100;
    },
    dismissFile() {
      this.selectedFile = false;
      this.contacts = [];
      this.filename = '';
      this.errorMessage = [];
      this.$refs.csv.value = '';
      this.isParsed = false;
    }
  },
  watch: {
    filename(newFilename) {
      this.selectedFile = newFilename;
    }
  }
};
</script>
<style lang="scss">
.selected {
  font-size: 14px;
}

.exemple-csv {
  font-weight: 600;
}

.error-message {
  font-size: 0.875rem;
}

.loader {
  background-color: rgba(255,255,255, .9);
  z-index: 999;
}
</style>
