<template>
    <div class="card" v-if="step==2">
        <h3 class="card-header text-center">Votre diplôme</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit" id="infos-diplome">
                <div class="form-row">
                    <label class="label">
                        Titre du diplôme:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="text" class="form-control"
                        v-model.trim="$v.diplomat_title.$model" :class="{
                            'is-invalid':$v.diplomat_title.$error, 'is-valid': !$v.diplomat_title.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.diplomat_title.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label">
                        Date du diplôme:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="date" class="form-control"
                        v-model.trim="$v.date_diplomat.$model" :class="{
                            'is-invalid':$v.date_diplomat.$error, 'is-valid': !$v.date_diplomat.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.date_diplomat.required" class="error-message">Ce champ est obligatoire!</span><br/>
                            <span v-if="!$v.date_diplomat.existingDate" class="error-message">Veuillez entrer une date valide!</span><br/>
                        </div>
                    </div>
                    <label class="label">
                        Copie du diplôme:
                    </label>    
                    <div class="form-group col-lg-12">
                        <vue-dropzone ref="diplomat_doc" id="diplomat_doc" :options="dropzoneOptions" required></vue-dropzone>
                    </div>                
                </div>
                <div class="emptyspace"></div>
                <div class="buttons">
                    <button class="btn btn-danger" @click="goBack">Précédent</button>
                    <span class="flex-spacer"></span>
                    <button type="submit" class="btn btn-success">Suivant</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const existingDate = (date) => (Math.floor((new Date() - new Date(date).getTime()) / 3.15576e+10) >= 0)
import {required} from 'vuelidate/lib/validators';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'InformationsDiplome',
  components: {
    vueDropzone: vue2Dropzone
  },
  
  data () {
    return {
      diplomat_title: "",
      date_diplomat: "",
      diplomat_doc: "",
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      },
    }
  },
  props: {
    step: Number,
    form: Object
  },

  validations: {
    diplomat_title: {required},
    date_diplomat: {required, existingDate}
  },

  methods: {
      handleSubmit() {
        this.$emit('step', 3);
        this.$emit('data', {
          diplomat_title: this.diplomat_title,
          date_diplomat: this.date_diplomat,
          diplomat_doc: this.diplomat_doc,
        })
        //console.log(this.diplomat_title+" "+this.date_diplomat)
      },
      goBack() {
        this.$emit('step', 1);
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
