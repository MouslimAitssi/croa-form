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

                    <label class="label" v-if="isMember()">
                        Attestation de travail:
                    </label>
                    <div class="form-group col-lg-12" v-if="isMember()">
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
      isPrivate: Boolean,
      isAssociate: Boolean
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
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
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
          console.log("agencyb id:", this.agency_id);
          for (let id of this.agency_ids) {
              if (id === this.agency_id) {
                  return true;
              }
          }
          return false;
      },
      hasAutorisation() {
        return this.isMember()&&this.isPrivate;
      },
      hasModeleSeven() {
        return this.isMember()&&this.isAssociate
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
