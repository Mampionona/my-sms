<template>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="dropzone p-5 mb-5">
            <div class="text-center">
              <div>Glisser et déposer votre fichier</div>
              <div class="my-3">- Ou -</div>
              <div>
                <label class="btn btn-icon btn-primary">
                  <span class="btn-inner--icon">
                    <i class="fas fa-download"></i>
                  </span>
                  <span class="btn-inner--text">Sélectionner votre fichier</span>
                  <input type="file" name="csv" id="csv" hidden @change="onChange" ref="csv">
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
              <input type="checkbox" class="custom-control-input" id="customCheck1">
              <label class="custom-control-label" for="customCheck1">Je certifie que :</label>
            </div>
            <ul>
              <li>J'ai obtenu de tous mes contacts le consentement libre et spécifique à leur envoyer des SMS.</li>
              <li>Aucun de mes contacts n'a été acquis via des listes de diffusion tierces.</li>
              <li>J'inclurai la mention STOP dans toute campagne marketing.</li>
              <li>Je n'enverrai avec SMS Partner que des informations légales et légitimes.</li>
            </ul>
          </div>
          <div class="text-right">
            <v-btn color="primary">Télécharger le fichier</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vBtn from '@/components/vBtn';

export default {
  components: { vBtn },
  data () {
    return {
      file: null,
      filename: ''
    };
  },
  methods: {
    onChange (event) {
      const files = this.$refs.csv.files;

      if (files.length > 0) {
        this.filename = files[0].name;
        console.log(files[0].name);
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
</style>
