<template>
    <div class="card" v-if="step==1">
        <h3 class="card-header text-center">Informations personnelles</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="form-row">
                    <label class="label">
                        Nom complet:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="text" class="form-control"
                        v-model.trim="$v.fullname.$model" :class="{
                            'is-invalid':$v.fullname.$error, 'is-valid': !$v.fullname.$invalid }" readonly >
                        <div class="invalid-feedback">
                            <span v-if="!$v.fullname.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label">
                        Civilité:
                    </label>
                    <div class="form-group col-lg-12">
                        <select class="form-control" aria-label="Selectionnez SVP" 
                        v-model.trim ="$v.gender.$model" :class="{
                            'is-invalid':$v.gender.$error, 'is-valid': !$v.gender.$invalid }" required>
                            <option value="m">Mr.</option>
                            <option value="f">Mme.</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.gender.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label">
                        Date de naissance:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="date" class="form-control"
                        v-model.trim="$v.birthday.$model" :class="{
                            'is-invalid':$v.birthday.$error, 'is-valid': !$v.birthday.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.birthday.required" class="error-message">Ce champ est obligatoire!</span><br v-if="!$v.birthday.required"/>
                            <span v-if="!$v.birthday.isMature" class="error-message">Votre doit être supérieure à 18!</span><br/>
                        </div>
                    </div>
                    <label class="label">
                        Mobile:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="text" class="form-control" placeholder="Commencez par 0"
                        v-model.trim="$v.mobile.$model" :class="{
                            'is-invalid':$v.mobile.$error, 'is-valid': !$v.mobile.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.mobile.required" class="error-message">Ce champ est obligatoire!</span><br v-if="!$v.mobile.required"/>
                            <span v-if="!$v.mobile.minLength" class="error-message">Valeur courte!</span><br v-if="!$v.mobile.minLength"/>
                            <span v-if="!$v.mobile.maxLength" class="error-message">Valeur longue!</span><br v-if="!$v.mobile.maxLength"/>
                            <span v-if="!$v.mobile.numeric" class="error-message">Entrer un numéro!</span><br v-if="!$v.mobile.numeric"/>
                            <span v-if="!$v.mobile.beginWithZero" class="error-message">Commencez par 0!</span>
                        </div>
                    </div>
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
                    <label class="label">
                        Forme d'exercice:
                    </label>
                    <div class="form-group col-lg-12">
                        <select class="form-control" aria-label="Selectionnez SVP" 
                            v-model.trim="$v.forme_id.$model" :class="{
                                'is-invalid':$v.forme_id.$error, 'is-valid': !$v.forme_id.$invalid }" required>
                            <option v-for="option in this.currentOptions" :key="option.value" :value="option.value">{{option.name}}</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.forme_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label">
                        Copie du CIN:
                    </label>
                    <div class="form-group col-lg-12">
                        <vue-dropzone ref="cin_doc" id="cin_doc" :options="dropzoneOptions" required></vue-dropzone>
                    </div>
                </div>
                <div class="emptyspace"></div>
                <div class="buttons">
                    <!-- <button class="btn btn-danger" @click="goBack">Précédent</button> -->
                    <span class="flex-spacer"></span>
                    <button type="submit" class="btn btn-success">Suivant</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
const beginWithZero = (mobile) => (mobile.charAt(0) === '0');
const isMature = (date) => (Math.floor((new Date() - new Date(date).getTime()) / 3.15576e+10) > 18)
export default {
  name: 'InformationsPersonnelles',
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    myName: String,
    step: Number,
    form: Object
  },

  data () {
    return {
      fullname: this.myName,
      gender: "",
      birthday: "",
      mobile: "",
      mode_id: "",
      forme_id: "",
      cin_doc: "",
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
      fullname: {
          required,
      },
      gender: {
          required
      },
      birthday: {
          required,
          isMature
      },
      mobile: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          beginWithZero,
          numeric
      },
      mode_id: {
          required
      },
      forme_id: {
          required
      },
      cin_doc: {
          required
      }
  },

  methods: {
    handleSubmit() {
      this.$emit('step', 2);
      this.$emit('data', {
          fullname: this.fullname,
          gender: this.gender,
          birthday: this.birthday,
          mobile: this.mobile,
          mode_id: this.mode_id,
          forme_id: this.forme_id,
          cin_doc: this.cin_doc
      })
      //console.log(this.fullname+" "+this.gender+" "+this.birthday+" "+this.mobile+" "+ this.mode_id + " " +this.forme_id + " " + this.cin_doc + " " + this.employer + " " + this.society + " " + this.ice);
    },
    getOptions(event) {
        for(let i = 0; i < this.mode_options.length; i++) {
            if (this.mode_options[i].value === event.target.value) {
                this.currentOptions = this.mode_options[i].form_options;
                break;
            }
        }
    },
    
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
