<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="card">
        <div class="card-body">
          <div class="dropzone p-5 mb-4" @drop.stop.prevent="handleFiles($event)" @dragenter.stop.prevent @dragover.stop.prevent>
            <div class="text-center">
              <div>Glisser et déposer votre fichier</div>
              <div class="my-2 small">- Ou -</div>
              <div>
                <label class="btn btn-icon btn-primary">
                  <span class="btn-inner--icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span class="btn-inner--text">Sélectionner votre fichier</span>
                  <input type="file" hidden ref="csv">
                </label>
              </div>
              <p class="mt-4 mb-0 text-sm" v-if="selectedFile">
                <strong>Fichier sélectionné :</strong> {{ filename }} <a href="#" @click.prevent="dismissFile"><i class="fas fa-trash-alt"></i></a>
              </p>
              <p v-if="errorMessage" class="text-danger mb-0 mt-4 font-weight-bold error-message">{{ errorMessage }}</p>
            </div>
          </div>

          <div class="form-group mb-5">
            <label for="custom-name" class="form-control-label">Personnaliser le nom du fichier</label>
            <input class="form-control" type="text" id="custom-name" v-model="customName">
          </div>

          <div class="alert alert-info" role="alert">
            <ul class="pl-2 mb-0">
              <li><p>La première ligne du fichier doit être le nom des colonnes.</p></li>
              <li><p>La liste des contacts doit être au format Excel ou CSV</p></li>
              <li><p>Pour un fichier CSV le séparateur doit être le pint-virgule et l'encoding UTF-8</p></li>
              <li><p>Le fichier doit contenir au minimum 1 colonne avec les numéros de portable</p></li>
              <li><p>Le nombre de lignes du fichier doit être au maximum de 100000 et au minimum de 5.</p></li>
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
              <li><p>J'inclurai la mention STOP dans toute campagne marketing.</p></li>
              <li><p>Je n'enverrai avec SMS Partner que des informations légales et légitimes.</p></li>
            </ul>
          </div>
          <div class="text-right">
            <button class="btn-primary btn" @click.prevent="importWorkbook">Télécharger le fichier</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card">
        <div class="card-header">
          <h5 class="h3 mb-0">Nos exemples</h5>
        </div>
        <div class="card-body">
          <ul>
            <li><p>Téléchargez un exemple de fichier simple <a :href="`${publicPath}exemples/Fichier_exemple_simple.csv`" class="exemple-csv">CSV</a></p></li>
            <li><p>Téléchargez un exemple de fichier avec variables <a :href="`${publicPath}exemples/Fichier_exemple_variable.csv`" class="exemple-csv">CSV</a></p></li>
            <li><p>Téléchargez un exemple de fichier simple <a :href="`${publicPath}exemples/Fichier_xls_exemple_simple.xls`" class="exemple-csv">XLS</a></p></li>
            <li><p>Téléchargez un exemple de fichier avec variables <a :href="`${publicPath}exemples/Fichier_xls_exemple_variable.xls`" class="exemple-csv">XLS</a></p></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validFileExtensions, workbookToArray, COUNT_MAX_LINES, COUNT_MIN_LINES } from '@/utils';
import vBtn from '@/components/vBtn';
import { mapActions } from 'vuex';

export default {
  components: { vBtn },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      certify: false,
      filename: '',
      contacts: [],
      selectedFile: false,
      errorMessage: '',
      customName: ''
    };
  },
  mounted() {
    this.$refs.csv.addEventListener('change', this.handleFiles, false);
  },
  methods: {
    ...mapActions({
      addContacts: 'contacts/addContacts',
      createNewList: 'lists/createNewList'
    }),
    handleFiles(event) {
      const { files } = event.type === 'drop' ? event.dataTransfer : event.target;
      this.prepareImport(files);
    },
    prepareImport(files) {
      if (files.length > 0) {
        const f = files[0];
        this.filename = f.name;
        // get file extension
        const fileExtension = f.name.substring(f.name.lastIndexOf('.'));

        if (!validFileExtensions.includes(fileExtension.toLowerCase())) {
          this.errorMessage = 'Les contacts doivent être enregistrés au format .xls, .xlsx ou .csv.';
          return;
        }

        workbookToArray(f, (contacts) => {
          const countLines = contacts.length;
          // this.filename = '';
          this.contacts = [];
          const columns = contacts.shift();

          if (countLines > COUNT_MAX_LINES || countLines < COUNT_MIN_LINES) {
            this.errorMessage = `Le nombre de lignes du fichier doit être au maximum de ${COUNT_MAX_LINES} et au minimum de ${COUNT_MIN_LINES}.`;
            return;
          }

          if (!columns.includes('telephone')) {
            this.errorMessage = 'Le fichier Excel doit avoir au moins une colonne nommée "telephone"';
            return;
          }

          const telephonePosition = columns.indexOf('telephone');

          this.contacts = contacts.map((contact) => {
            const contactObject = {};
            columns.forEach((column, index) => {
              contactObject[column] = contact[index];
              // prepend phone number with + if not
              if (telephonePosition !== -1 && index === telephonePosition) {
                const telephone = contact[telephonePosition].toString();
                if (!telephone.match(/^\+/)) contactObject[column] = `+${telephone}`;
              }
            });

            return contactObject;
          });

          this.errorMessage = '';
        });
      }
    },
    importWorkbook() {
      const { customName, filename, contacts } = this;
      const len = contacts.length;
      if (len < COUNT_MIN_LINES || len > COUNT_MAX_LINES) {
        return;
      }
      // create a new list
      if (this.certify) {
        this.createNewList({
          name: customName || filename
        })
        .then(data => this.addContactsToAList(data.id, contacts));
      }
    },
    addContactsToAList(listId, contacts) {
      this.addContacts({ listId, contacts }).then(() => {
        this.$router.push({
          name: 'contacts',
          params: { listId }
        });
      });
    },
    dismissFile() {
      this.selectedFile = false;
      this.contacts = [];
      this.filename = '';
      this.errorMessage = '';
      this.$refs.csv.value = '';
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
</style>
