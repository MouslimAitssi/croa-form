<template>

    <div class="card" v-if="step==4">
        <h3 class="card-header text-center">Autorisation</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="form-row">
                    <label class="label" v-if="showEmployer()">
                        Organisme employeur:
                    </label>
                    <div class="form-group col-lg-12" v-if="showEmployer()">
                        <input type="text" class="form-control"
                        v-model="employer" :class="{
                            'is-invalid':$v.employer.$error, 'is-valid': !$v.employer.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.employer.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="showSociety()">
                        Société:
                    </label>
                    <div class="form-group col-lg-12" v-if="showSociety()">
                        <input type="text" class="form-control"
                        v-model="society" :class="{
                            'is-invalid':$v.society.$error, 'is-valid': !$v.society.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.society.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="showICE()">
                        ICE:
                    </label>
                    <div class="form-group col-lg-12" v-if="showICE()">
                        <input type="text" class="form-control"
                        v-model="ice" :class="{
                            'is-invalid':$v.ice.$error, 'is-valid': !$v.ice.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.ice.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label">
                        Décision portant autorisation:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="text" class="form-control"
                        v-model.trim="$v.autorisation_number.$model" :class="{
                            'is-invalid':$v.autorisation_number.$error, 'is-valid': !$v.autorisation_number.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.autorisation_number.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    
                    <label class="label">
                        Date d'autorisation:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="date" class="form-control"
                        v-model.trim="$v.date_autorisation.$model" :class="{
                            'is-invalid':$v.date_autorisation.$error, 'is-valid': !$v.date_autorisation.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.date_autorisation.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    
                    <label class="label">
                        Autorisation:
                    </label>
                    <div class="form-group col-lg-12">
                        <vue-dropzone ref="autorisation_doc" id="autorisation_doc" :options="dropzoneOptions"></vue-dropzone>
                    </div>

                    <label class="label">
                        Autorisation de régularité:
                    </label>
                    <div class="form-group col-lg-12">
                        <vue-dropzone ref="regularity_doc" id="regularity_doc" :options="dropzoneOptions"></vue-dropzone>
                    </div>

                    <label class="label">
                        Attestation de travail:
                    </label>
                    <div class="form-group col-lg-12">
                        <vue-dropzone ref="job_doc" id="job_doc" :options="dropzoneOptions"></vue-dropzone>
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
import {required} from 'vuelidate/lib/validators'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'InformationsDiplome',
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    step: Number,
    forme_id: String
  },
  data () {
      return {
        //props
        ex_form: this.forme_id,
        autorisation_number: "",
        date_autorisation: "",
        employer: "",
        society: "",
        ice: "",
        autorisation_doc: "",
        regularity_doc: "",
        job_doc: "",
        dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
        }
      }
  },

  validations: {
    autorisation_number: {required},
    date_autorisation: {required},
    employer: { required },
    society: { required },
    ice: { required },
    autorisation_doc: {required},
    regularity_doc: {required},
    job_doc: {required}
  },

  methods: {
    handleSubmit() {
        this.$emit('data', {
            autorisation_number: this.autorisation_number,
            date_autorisation: this.date_autorisation,
            employer: this.employer,
            society: this.society,
            ice: this.ice,
            autorisation_doc: this.autorisation_doc,
            regularity_doc: this.regularity_doc,
            job_doc: this.job_doc
        })
        //console.log(this.autorisation_number+" "+this.date_autorisation + " " + this.autorisation_doc + " " + this.regularity_doc + " " + this.regularity_doc);
    },
    goBack() {
        this.$emit('step', 3);
    },
    showICE() {
        return (this.ex_form==="3" || this.ex_form==="4");
    },
    showEmployer() {
        return (this.ex_form === "1" ||this.ex_form === "2" || this.ex_form === "5" || this.ex_form ===  "6");
    },
    showSociety() {
        return (this.ex_form === "4");
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
