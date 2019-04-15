<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="card">
        <div class="card-body">
          <div class="dropzone p-5 mb-5" @drop.stop.prevent="handleFiles($event)" @dragenter.stop.prevent @dragover.stop.prevent>
            <div class="text-center">
              <div>Glisser et déposer votre fichier</div>
              <div class="my-3">- Ou -</div>
              <div>
                <label class="btn btn-icon btn-primary">
                  <span class="btn-inner--icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span class="btn-inner--text">Sélectionner votre fichier</span>
                  <input type="file" hidden ref="csv">
                </label>
              </div>
            </div>
          </div>
          <div class="alert alert-info" role="alert">
            <ul class="pl-2">
              <li>La première ligne du fichier doit être le nom des colonnes.</li>
              <li>La liste des contacts doit être au format Excel ou CSV</li>
              <li>Pour un fichier CSV le séparateur doit être le pint-virgule et l'encoding UTF-8</li>
              <li>Le fichier doit contenir au minimum 1 colonne avec les numéros de portable</li>
              <li>Le nombre de lignes du fichier doit être au maximum de 100000 et au minimum de 5.</li>
            </ul>
          </div>
          <div class="alert">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="certify" v-model="certify">
              <label class="custom-control-label" for="certify">Je certifie que :</label>
            </div>
            <ul>
              <li>J'ai obtenu de tous mes contacts le consentement libre et spécifique à leur envoyer des SMS.</li>
              <li>Aucun de mes contacts n'a été acquis via des listes de diffusion tierces.</li>
              <li>J'inclurai la mention STOP dans toute campagne marketing.</li>
              <li>Je n'enverrai avec SMS Partner que des informations légales et légitimes.</li>
            </ul>
          </div>
          <div class="text-right">
            <v-btn color="primary" :disabled="!certify" @click.native="importWorkbook">Télécharger le fichier</v-btn>
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
            <li>Téléchargez un exemple de fichier simple <a href="#" class="exemple-csv" target="_blank">CSV</a></li>
            <li>Téléchargez un exemple de fichier avec variables <a href="#" class="exemple-csv" target="_blank">CSV</a></li>
            <li>Téléchargez un exemple de fichier simple <a href="#" class="exemple-csv" target="_blank">XLS</a></li>
            <li>Téléchargez un exemple de fichier avec variables <a href="#" class="exemple-csv" target="_blank">XLS</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validFileExtensions, workbookToArray, COUNT_MAX_LINES, COUNT_MIN_LINES } from '@/utils';
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  data () {
    return {
      certify: false,
      filename: '',
      data: []
    };
  },
  mounted () {
    this.$refs.csv.addEventListener('change', this.handleFiles, false);
  },
  methods: {
    handleFiles (event) {
      let files;
      switch (event.type) {
        case 'drop':
          files = event.dataTransfer.files;
          break;

        case 'change':
          files = event.target.files;
      }

      if (files.length > 0) {
        const f = files[0];
        // get file extension
        const file_extension = f.name.substring(f.name.lastIndexOf('.'));

        if (!validFileExtensions.includes(file_extension.toLowerCase())) {
          alert('Les contacts doivent être enregistrées au format .xls, .xlsx ou .csv.');
          return;
        }

        workbookToArray(f, (array, file) => {
          const countLines = array.length;
          if (countLines > COUNT_MAX_LINES || countLines < COUNT_MIN_LINES) {
            alert(`Le nombre de lignes du fichier doit être au maximum de ${COUNT_MAX_LINES} et au minimum de ${COUNT_MIN_LINES}.`);
            this.filename = '';
            this.data = [];
            return;
          }

          this.filename = file.name;
          this.data = array;
        });
      }
    },
    importWorkbook () {
      const { filename, data } = this;
      if (this.certify) {
        console.log('import', filename, data);
      }
    }
  }
}
</script>
<style lang="scss">
.dropzone {
  border: 2px dashed #b5b5b5;
  border-radius: 0.375rem;
}

.selected {
  font-size: 14px;
}

.exemple-csv {
  font-weight: 600;
}
</style>
