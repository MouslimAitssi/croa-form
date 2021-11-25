<template>
    <div class="card" v-if="step==4">
        <h3 class="card-header text-center">Documents</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit" id="infos-diplome">
                <div class="form-row">
                    <label class="label" v-if="isMember()">
                        Copie du CIN:
                    </label>
                    <div class="form-group col-lg-12" v-if="isMember()">
                        <vue-dropzone ref="cin_doc" id="cin_doc" :options="dropzoneOptions" required></vue-dropzone>
                    </div>
                    <label class="label" v-if="isMember()">
                        Copie du diplôme:
                    </label>
                    <div class="form-group col-lg-12" v-if="isMember()">
                        <vue-dropzone ref="diplomat_doc" id="diplomat_doc" :options="dropzoneOptions" required></vue-dropzone>
                    </div>
                    <label class="label" v-if="hasAutorisation()">
                        Autorisation:
                    </label>
                    <div class="form-group col-lg-12" v-if="hasAutorisation()">
                        <vue-dropzone ref="autorisation_doc" id="autorisation_doc" :options="dropzoneOptions"></vue-dropzone>
                    </div>

                    <label class="label" v-if="!isMember()">
                        Autorisation de régularité:
                    </label>
                    <div class="form-group col-lg-12" v-if="!isMember()">
                        <vue-dropzone ref="regularity_doc" id="regularity_doc" :options="dropzoneOptions"></vue-dropzone>
                    </div>

                    <label class="label" v-if="HasAttestation()">
                        Attestation de travail:
                    </label>
                    <div class="form-group col-lg-12" v-if="HasAttestation()">
                        <vue-dropzone ref="job_doc" id="job_doc" :options="dropzoneOptions"></vue-dropzone>
                    </div>

                    <label class="label" v-if="hasModeleSeven()">
                        Modèle sept:
                    </label>
                    <div class="form-group col-lg-12" v-if="hasModeleSeven()">
                        <vue-dropzone ref="model_seven_doc" id="model_seven_doc" :options="dropzoneOptions"></vue-dropzone>
                    </div>
                </div>
                <div class="emptyspace"></div>

                <div class="buttons">
                    <button class="btn btn-danger" @click="goBack">Précédent</button>
                    <span class="flex-spacer"></span>
                    <button type="submit" class="btn btn-success">Valider</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Documents',
  props: {
      agency_id: Number,
      step: Number,
      mode_id: String,
      forme_id : String
  },
  components: {
    vueDropzone: vue2Dropzone
  },

  data () {
    return {
      agency_ids: [11],
      diplomat_doc: "",
      cin_doc: "",
      autorisation_doc: "",
      regularity_doc: "",
      job_doc: "",
      dropzoneOptions: {
          url: 'http://localhost:8000/users/media',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: {  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content }
      },
    }
  },


  validations: {
    diplomat_doc: { required },
    cin_doc: { required },
    autorisation_doc: { required },
    regularity_doc: { required },
    job_doc: { required },
  },

  methods: {
      handleSubmit() {
        this.$emit('data', {
          diplomat_doc: this.diplomat_doc,
          cin_doc: this.cin_doc,
          autorisation_doc: this.autorisation_doc,
          regularity_doc: this.regularity_doc,
          job_doc: this.job_doc,
        })
      },
      goBack() {
        this.$emit('step', 3);
      },
      isMember() {
          return this.agency_ids.includes(this.agency_id)
      },
      hasAutorisation() {
        return (this.isMember()&& (parseInt(this.mode_id) === 2)) ;
      },
      hasModeleSeven() {
        return (this.isMember()&& (parseInt(this.forme_id) === 4)) ;
      },
      HasAttestation(){
        return (this.isMember()&& ![3,4].includes(parseInt(this.forme_id)));
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .label {
        margin-left: 5px
    }

    .error-message {
        color: #ff0644;
    }

    .success-message {
        color:#06ff3c
    }

    .buttons {
        display: flex;
        width: 100%;
    }

    .flex-spacer {
        flex: 1 1 auto;
    }

    .emptyspace {
        height: 50px;
    }
</style>
