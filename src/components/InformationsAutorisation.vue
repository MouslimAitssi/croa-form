<template>
    <div class="card" v-if="step==3">
        <h3 class="card-header text-center">Autorisation</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="form-row">
                    <label class="label">
                        Nom du mode:
                    </label>
                    <div class="form-group col-lg-12">
                        <select class="form-control" @change="getOptions($event)" aria-label="Selectionnez SVP"
                            v-model.trim="$v.mode_id.$model" :class="{
                            'is-invalid':$v.mode_id.$error, 'is-valid': !$v.mode_id.$invalid }" required>
                            <option v-for="option in mode_options" :key="option.value" :value="option.value">{{option.name}}</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.mode_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="currentOptions.length > 0">
                        Forme d'exercice:
                    </label>
                    <div class="form-group col-lg-12" v-if="currentOptions.length > 0">
                        <select class="form-control" aria-label="Selectionnez SVP"
                            v-model.trim="$v.forme_id.$model" :class="{
                                'is-invalid':$v.forme_id.$error, 'is-valid': !$v.forme_id.$invalid }" required>
                            <option v-for="option in this.currentOptions" :key="option.value" :value="option.value">{{option.name}}</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.forme_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
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
                        <input type="number" class="form-control"
                        v-model="ice" :class="{
                            'is-invalid':$v.ice.$error, 'is-valid': !$v.ice.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.ice.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="isPrivate()">
                        Décision portant autorisation:
                    </label>
                    <div class="form-group col-lg-12" v-if="isPrivate()">
                        <input type="text" class="form-control"
                        v-model.trim="$v.autorisation_number.$model" :class="{
                            'is-invalid':$v.autorisation_number.$error, 'is-valid': !$v.autorisation_number.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.autorisation_number.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>

                    <label class="label" v-if="isPrivate()">
                        Date d'autorisation:
                    </label>
                    <div class="form-group col-lg-12" v-if="isPrivate()">
                        <input type="date" class="form-control"
                        v-model.trim="$v.date_autorisation.$model" :class="{
                            'is-invalid':$v.date_autorisation.$error, 'is-valid': !$v.date_autorisation.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.date_autorisation.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
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
import {required} from 'vuelidate/lib/validators'
//import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'InformationsDiplome',
  /* components: {
    vueDropzone: vue2Dropzone
  }, */
  props: {
    step: Number
  },
  data () {
      return {
        autorisation_number: "",
        date_autorisation: "",
        employer: "",
        society: "",
        ice: "",
        mode_id: "",
        forme_id: "",
        mode_options: [{name: "Public", value: "1", form_options: [{name: "Fonctionnaire", value: "1"}, {name: "Agent", value: "2"}]}, {name: "Privé", value: "2", form_options: [{name: "Indépendant", value: "3"}, {name: "Associé", value: "4"}, {name: "Salarié", value: "5"}]}, {name: "Enseignant", value: "3", form_options: [{name: "Enseignant", value: "6"}]}],
        currentOptions: [],
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
    job_doc: {required},
    mode_id: { required },
    forme_id: { required }
  },

  methods: {
    handleSubmit() {
        this.$emit('step', 4);
        this.$emit('data', {
            autorisation_number: this.autorisation_number,
            date_autorisation: this.date_autorisation,
            employer: this.employer,
            society: this.society,
            ice: this.ice,
            mode_id: this.mode_id,
            forme_id: this.forme_id,
        })
        //console.log(this.autorisation_number+" "+this.date_autorisation + " " + this.autorisation_doc + " " + this.regularity_doc + " " + this.regularity_doc);
    },
    goBack() {
        this.$emit('step', 2);
    },
    showICE() {
        return (this.forme_id==="3" || this.forme_id==="4");
    },
    showEmployer() {
        return (this.forme_id === "1" ||this.forme_id === "2" || this.forme_id === "5" || this.forme_id ===  "6");
    },
    showSociety() {
        return (this.forme_id === "4");
    },
    getOptions(event) {
        for(let i = 0; i < this.mode_options.length; i++) {
            if (this.mode_options[i].value === event.target.value) {
                this.currentOptions = this.mode_options[i].form_options;
                break;
            }
        }
    },
    isPrivate() {
        return (this.mode_id==="2");
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
