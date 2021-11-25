<template>
    <div class="card" v-if="step==2">
        <h3 class="card-header text-center">Adresse professionnel</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="form-row">
                    <label class="label">Région: </label>
                    <div class="form-group col-lg-12">
                        <b-form-select class="form-control" @change="getProvinces($event)" aria-label="Selectionnez SVP"
                        v-model.trim="$v.region_id.$model" :class="{
                            'is-invalid':$v.region_id.$error, 'is-valid': !$v.region_id.$invalid }" :options="regions" required >
                        </b-form-select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.region_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="provinces.length > 0">
                        Province et préfecture:
                    </label>
                    <div class="form-group col-lg-12" v-if="provinces.length > 0">
                        <b-form-select class="form-control" @change="getCommunes($event)" aria-label="Selectionnez SVP" :options="provinces"
                                       v-model.trim="$v.province_id.$model" :class="{
                            'is-invalid':$v.province_id.$error, 'is-valid': !$v.province_id.$invalid }" required>
                        </b-form-select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.province_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="communes.length > 0">
                        Communes:
                    </label>
                    <div class="form-group col-lg-12" v-if="communes.length > 0">
                    <b-form-select class="form-control" @change="getArrondissements($event)" aria-label="Selectionnez SVP" :options="communes"
                                   v-model.trim="$v.commune_id.$model" :class="{
                            'is-invalid':$v.commune_id.$error, 'is-valid': !$v.commune_id.$invalid }" required>
                    </b-form-select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.commune_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="arrondissements.length > 0">Arrondissements:</label>
                    <div class="form-group col-lg-12" v-if="arrondissements.length > 0">
                        <b-form-select class="form-control" aria-label="Selectionnez SVP" required :options="arrondissements"
                                       v-model.trim="$v.arrond_id.$model" :class="{
                            'is-invalid':$v.arrond_id.$error, 'is-valid': !$v.arrond_id.$invalid }"></b-form-select>

                    </div>
                    <label class="label">
                        Adresse professionnelle:
                    </label>
                    <div class="form-group col-lg-12">
                        <input type="text" class="form-control"
                        v-model.trim="$v.address.$model" :class="{
                            'is-invalid':$v.address.$error, 'is-valid': !$v.address.$invalid }" required>
                        <div class="invalid-feedback">
                            <span v-if="!$v.address.required" class="error-message">Ce champ est obligatoire!</span>
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
import axios from 'axios'
export default {
  name: 'InformationsAdresse',
//  SITE_URL: 'https://beta.croatanger.org',
  data () {
      return {
          SITE_URL : 'http://localhost:8000',
          region_id: "",
          province_id: "",
          commune_id: "",
          arrond_id: "",
          address: "",
          provinces: [],
          regions: [],
          communes: [],
          arrondissements: [],
          agency_id : "" ,
      }
  },
  props: {
    step: Number,
    form: Object
  },
  validations: {
    region_id: {required},
    province_id: {required},
    commune_id: {required},
    arrond_id: {required},
    address: {required}
  },

   mounted() {
     this.getRegionsFromBackend();
//     this.getProvincesFromBackend();
//     this.getCommunesFromBackend();
//     this.getArrondsFromBackend();
    }   ,
  methods: {

      getRegionsFromBackend() {
          axios.get(this.SITE_URL+'/api/v1/regions')
               .then(res => {
                const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat }));
                data.sort((a, b) => (a.text.localeCompare(b.text))) ;
                this.regions = data ;
          })
      },
//      getProvincesFromBackend() {
//          axios.get(this.SITE_URL+'/api/v1/provinces')
//              .then(res => {
//                  const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , regionItem : item.region_id , agencyItem : item.agency_id }));
//                  data.sort((a, b) => (a.text.localeCompare(b.text))) ;
//                  this.provinces = data ;
//              })
//      },
//      getCommunesFromBackend() {
//          axios.get(this.SITE_URL+'/api/v1/communes')
//               .then(res => {
//                const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat  }));
//                data.sort((a, b) => (a.text.localeCompare(b.text))) ;
//                this.communes = data ;
//          })
//      },
//      getArrondsFromBackend() {
//          axios.get(this.SITE_URL+'/api/v1/arrondissements')
//              .then(res => {
//                  const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat }));
//                  data.sort((a, b) => (a.text.localeCompare(b.text))) ;
//                  this.arrondissements = data ;
//              })
//      },

      handleSubmit() {
        this.$emit('step', 3);
        this.$emit('data', {
            province_id: this.province_id,
            commune_id: this.commune_id,
            arrond_id: this.arrond_id,
            address: this.address,
            agency_id: this.agency_id
        })
      },
      goBack() {
        this.$emit('step', 1);
      },

      getProvinces(event) {
          axios.get(this.SITE_URL+'/api/v1/provinces/'+event)
              .then(res => {
                  const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , regionItem : item.region_id , agencyItem : item.agency_id }));
                  data.sort((a, b) => (a.text.localeCompare(b.text))) ;
                  this.provinces = data ;
              })
      },
      getCommunes(event) {
            this.agency_id = this.provinces.find(elm => elm.value === event).agencyItem ;
            console.log(this.agency_id) ;
            axios.get(this.SITE_URL+'/api/v1/commune/'+event)
              .then(res => {
                  const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat }));
                  data.sort((a, b) => (a.text.localeCompare(b.text))) ;
                  this.communes = data ;
              })
      },
      getArrondissements(event) {
          axios.get(this.SITE_URL+'/api/v1/arrond/'+event)
              .then(res => {
                  const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat }));
                  data.sort((a, b) => (a.text.localeCompare(b.text))) ;
                  this.arrondissements = data ;
              })
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
