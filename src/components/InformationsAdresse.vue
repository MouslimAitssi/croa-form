<template>
    <div class="card" v-if="step==2">
        <h3 class="card-header text-center">Adresse professionnel</h3>
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="form-row">
                    <label class="label">
                        Région:
                    </label>
                    <div class="form-group col-lg-12">
                        <select class="form-control" @change="getProvinces($event)" aria-label="Selectionnez SVP"
                        v-model.trim="$v.region_id.$model" :class="{
                            'is-invalid':$v.region_id.$error, 'is-valid': !$v.region_id.$invalid }" required>
                            <option v-for="region in regions" :key="region.id" :value="region.id">{{region.name_lat}}</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.region_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="currentProvinces.length > 0">
                        Province et préfecture:
                    </label>
                    <div class="form-group col-lg-12" v-if="currentProvinces.length > 0">
                        <select class="form-control" @change="getCommunes($event)" aria-label="Selectionnez SVP"
                        v-model.trim="$v.province_id.$model" :class="{
                            'is-invalid':$v.province_id.$error, 'is-valid': !$v.province_id.$invalid }" required>
                            <option v-for="province in currentProvinces" :key="province.id" :value="province.id">{{province.name_lat}}</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.province_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="currentCommunes.length > 0">
                        Commune:
                    </label>
                    <div class="form-group col-lg-12" v-if="currentCommunes.length > 0">
                    <select class="form-control" @change="getArrondissements($event)" aria-label="Selectionnez SVP"
                        v-model.trim="$v.commune_id.$model" :class="{
                            'is-invalid':$v.commune_id.$error, 'is-valid': !$v.commune_id.$invalid }" required>
                            <option v-for="commune in currentCommunes" :key="commune.id" :value="commune.id">{{commune.name_lat}}</option>
                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.commune_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label" v-if="currentArrondissements.length > 0">
                        Arrondissement:
                    </label>
                    <div class="form-group col-lg-12" v-if="currentArrondissements.length > 0">
                        <select class="form-control" aria-label="Selectionnez SVP"
                        v-model.trim="$v.arrond_id.$model" :class="{
                            'is-invalid':$v.arrond_id.$error, 'is-valid': !$v.arrond_id.$invalid }" required>
                            <option v-for="arrondissement in currentArrondissements" :key="arrondissement.id" :value="arrondissement.id">{{arrondissement.name_lat}}</option>

                        </select>
                        <div class="invalid-feedback">
                            <span v-if="!$v.arrond_id.required" class="error-message">Ce champ est obligatoire!</span>
                        </div>
                    </div>
                    <label class="label">
                        Adresse professionnel:
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
  SITE_URL: 'https://beta.croatanger.org',
  /* mounted() {
      this.getRegionsFromBackend();
  }, */
  data () {
      return {
          region_id: "",
          province_id: "",
          commune_id: "",
          arrond_id: "",
          address: "",
          provinces: [{"name_lat":"RABAT","id":1,"agency_id":6,"region_id":40},{"name_lat":"SALE","id":2,"agency_id":6,"region_id":40},{"name_lat":"SKHIRATE-TEMARA","id":3,"agency_id":6,"region_id":40},{"name_lat":"KHEMISSET","id":4,"agency_id":6,"region_id":40},{"name_lat":"CASABLANCA","id":5,"agency_id":4,"region_id":42},{"name_lat":"MOHAMMADIA","id":13,"agency_id":4,"region_id":42},{"name_lat":"NOUACEUR","id":14,"agency_id":4,"region_id":42},{"name_lat":"MEDIOUNA","id":15,"agency_id":4,"region_id":42},{"name_lat":"AGADIR-IDA-OU-TANANE","id":16,"agency_id":1,"region_id":45},{"name_lat":"INEZGANE-A\u00cfT MELLOUL","id":17,"agency_id":1,"region_id":45},{"name_lat":"CHTOUKA AIT BAHA","id":18,"agency_id":1,"region_id":45},{"name_lat":"TAROUDANNT","id":19,"agency_id":1,"region_id":45},{"name_lat":"TIZNIT","id":20,"agency_id":1,"region_id":45},{"name_lat":"OUARZAZATE","id":21,"agency_id":1,"region_id":44},{"name_lat":"ZAGORA","id":22,"agency_id":1,"region_id":44},{"name_lat":"TINGHIR","id":23,"agency_id":1,"region_id":44},{"name_lat":"SIDI IFNI","id":24,"agency_id":1,"region_id":46},{"name_lat":"AL HOCEIMA","id":25,"agency_id":10,"region_id":37},{"name_lat":"TAZA","id":26,"agency_id":8,"region_id":39},{"name_lat":"TAOUNATE","id":27,"agency_id":8,"region_id":39},{"name_lat":"GUERCIF","id":28,"agency_id":8,"region_id":38},{"name_lat":"BENI MELLAL","id":29,"agency_id":4,"region_id":41},{"name_lat":"AZILAL","id":30,"agency_id":4,"region_id":41},{"name_lat":"FQUIH BEN SALAH","id":31,"agency_id":4,"region_id":41},{"name_lat":"FES","id":32,"agency_id":8,"region_id":39},{"name_lat":"MOULAY YACOUB","id":33,"agency_id":8,"region_id":39},{"name_lat":"SEFROU","id":34,"agency_id":8,"region_id":39},{"name_lat":"BOULEMANE","id":35,"agency_id":8,"region_id":39},{"name_lat":"GUELMIM","id":36,"agency_id":1,"region_id":46},{"name_lat":"TATA","id":37,"agency_id":1,"region_id":45},{"name_lat":"ASSA-ZAG","id":38,"agency_id":1,"region_id":46},{"name_lat":"ES-SEMARA","id":39,"agency_id":1,"region_id":47},{"name_lat":"TAN-TAN","id":40,"agency_id":1,"region_id":46},{"name_lat":"KENITRA","id":41,"agency_id":2,"region_id":40},{"name_lat":"SIDI KACEM","id":42,"agency_id":2,"region_id":40},{"name_lat":"SIDI SLIMANE","id":43,"agency_id":2,"region_id":40},{"name_lat":"LAAYOUNE","id":44,"agency_id":1,"region_id":47},{"name_lat":"BOUJDOUR","id":45,"agency_id":1,"region_id":47},{"name_lat":"TARFAYA","id":46,"agency_id":1,"region_id":47},{"name_lat":"MARRAKECH","id":47,"agency_id":3,"region_id":43},{"name_lat":"CHICHAOUA","id":48,"agency_id":3,"region_id":43},{"name_lat":"AL HAOUZ","id":49,"agency_id":3,"region_id":43},{"name_lat":"EL KELAA DES SERAGHNA","id":50,"agency_id":3,"region_id":43},{"name_lat":"ESSAOUIRA","id":51,"agency_id":3,"region_id":43},{"name_lat":"REHAMNA","id":52,"agency_id":3,"region_id":43},{"name_lat":"MEKNES","id":53,"agency_id":7,"region_id":39},{"name_lat":"EL HAJEB","id":54,"agency_id":7,"region_id":39},{"name_lat":"IFRANE","id":55,"agency_id":7,"region_id":39},{"name_lat":"KHENIFRA","id":56,"agency_id":7,"region_id":41},{"name_lat":"ERRACHIDIA","id":57,"agency_id":7,"region_id":44},{"name_lat":"MIDELT","id":58,"agency_id":7,"region_id":44},{"name_lat":"OUED ED-DAHAB","id":59,"agency_id":1,"region_id":48},{"name_lat":"AOUSSERD","id":60,"agency_id":1,"region_id":48},{"name_lat":"OUJDA-ANGAD","id":61,"agency_id":9,"region_id":38},{"name_lat":"JERADA","id":62,"agency_id":9,"region_id":38},{"name_lat":"TAOURIRT","id":63,"agency_id":9,"region_id":38},{"name_lat":"FIGUIG","id":64,"agency_id":9,"region_id":38},{"name_lat":"NADOR","id":65,"agency_id":10,"region_id":38},{"name_lat":"DRIOUCH","id":66,"agency_id":10,"region_id":38},{"name_lat":"SAFI","id":67,"agency_id":5,"region_id":43},{"name_lat":"EL JADIDA","id":68,"agency_id":5,"region_id":42},{"name_lat":"SIDI BENNOUR","id":69,"agency_id":5,"region_id":42},{"name_lat":"YOUSSOUFIA","id":70,"agency_id":5,"region_id":43},{"name_lat":"SETTAT","id":71,"agency_id":4,"region_id":42},{"name_lat":"KHOURIBGA","id":72,"agency_id":4,"region_id":41},{"name_lat":"BENSLIMANE","id":73,"agency_id":4,"region_id":42},{"name_lat":"BERRECHID","id":74,"agency_id":4,"region_id":42},{"name_lat":"TANGER-ASSILAH","id":75,"agency_id":11,"region_id":37},{"name_lat":"FAHS-ANJRA","id":76,"agency_id":11,"region_id":37},{"name_lat":"TETOUAN","id":77,"agency_id":12,"region_id":37},{"name_lat":"M'DIQ-FNIDEQ","id":78,"agency_id":12,"region_id":37},{"name_lat":"LARACHE","id":79,"agency_id":11,"region_id":37},{"name_lat":"CHEFCHAOUEN","id":80,"agency_id":11,"region_id":37},{"name_lat":"OUEZZANE","id":81,"agency_id":2,"region_id":37},{"name_lat":"BERKANE","id":82,"agency_id":9,"region_id":38}],
          regions: [{"name_lat":"Tanger-T\u00e9touan-Al Hoceima","id":37,"is_member":1},{"name_lat":"L'Oriental","id":38,"is_member":0},{"name_lat":"F\u00e8s-Mekn\u00e8s","id":39,"is_member":0},{"name_lat":"Rabat-Sal\u00e9-K\u00e9nitra","id":40,"is_member":0},{"name_lat":"B\u00e9ni Mellal-Kh\u00e9nifra","id":41,"is_member":0},{"name_lat":"Casablanca-Settat","id":42,"is_member":0},{"name_lat":"Marrakech-Safi","id":43,"is_member":0},{"name_lat":"Dr\u00e2a-Tafilalet","id":44,"is_member":0},{"name_lat":"Souss-Massa","id":45,"is_member":0},{"name_lat":"Guelmim-Oued Noun","id":46,"is_member":0},{"name_lat":"La\u00e2youne-Sakia El Hamra","id":47,"is_member":0},{"name_lat":"Dakhla-Oeud Ed-Dahab","id":48,"is_member":0}],
          communes: [{"name_lat":"RABAT","id":1,"province_id":1},{"name_lat":"TOUARGA","id":2,"province_id":1},{"name_lat":"SALE","id":3,"province_id":2},{"name_lat":"SIDI BOUKNADEL","id":4,"province_id":2},{"name_lat":"SHOUL","id":5,"province_id":2},{"name_lat":"AMEUR","id":6,"province_id":2},{"name_lat":"TEMARA","id":7,"province_id":3},{"name_lat":"HARHOURA","id":8,"province_id":3},{"name_lat":"SKHIRATE","id":9,"province_id":3},{"name_lat":"AIN El AOUDA","id":10,"province_id":3},{"name_lat":"AIN ATTIG","id":11,"province_id":3},{"name_lat":"MERS EL KHEIR","id":12,"province_id":3},{"name_lat":"SABBAH","id":13,"province_id":3},{"name_lat":"EL MENZAH","id":14,"province_id":3},{"name_lat":"OUMAZZA","id":15,"province_id":3},{"name_lat":"SIDI YAHYA ZAER","id":16,"province_id":3},{"name_lat":"KHEMISSET","id":17,"province_id":4},{"name_lat":"ROMMANI","id":18,"province_id":4},{"name_lat":"TIFLET","id":19,"province_id":4},{"name_lat":"SIDI ALLAL EL BAHRAOUI","id":20,"province_id":4},{"name_lat":"AIT SIBERNE","id":21,"province_id":4},{"name_lat":"AIT MIMOUNE","id":22,"province_id":4},{"name_lat":"AIT OURIBEL","id":23,"province_id":4},{"name_lat":"MAJMAA TOLBA","id":24,"province_id":4},{"name_lat":"EL GANZRA","id":25,"province_id":4},{"name_lat":"AIT YADINE","id":26,"province_id":4},{"name_lat":"SFASSIF","id":27,"province_id":4},{"name_lat":"SIDI ALLAL LAMSADDER","id":28,"province_id":4},{"name_lat":"SIDI EL RHANDOUR","id":29,"province_id":4},{"name_lat":"HOUDERRANE","id":30,"province_id":4},{"name_lat":"MAAZIZ","id":31,"province_id":4},{"name_lat":"AIT IKKOU","id":32,"province_id":4}], //very big
          arrondissements: [{"name_lat":"YACOUB EL MANSOUR","id":1,"commune_id":1},{"name_lat":"HASSAN","id":2,"commune_id":1},{"name_lat":"EL YOUSSOUFIA","id":3,"commune_id":1},{"name_lat":"AGDAL RIYAD","id":4,"commune_id":1},{"name_lat":"SOUISSI","id":5,"commune_id":1},{"name_lat":"TABRIQUET","id":6,"commune_id":3},{"name_lat":"BAB LAMRISSA","id":7,"commune_id":3},{"name_lat":"BETTANA","id":8,"commune_id":3},{"name_lat":"LAYAYDA","id":9,"commune_id":3},{"name_lat":"HSSAINE","id":10,"commune_id":3},{"name_lat":"SIDI BELYOUT","id":11,"commune_id":52},{"name_lat":"HAY HASSANI","id":12,"commune_id":52},{"name_lat":"AL FIDA","id":13,"commune_id":52},{"name_lat":"BEN MSIK","id":14,"commune_id":52},{"name_lat":"AIN-CHOCK","id":15,"commune_id":52},{"name_lat":"SIDI OTHMANE","id":16,"commune_id":52},{"name_lat":"MAARIF","id":17,"commune_id":52},{"name_lat":"HAY MOHAMMADI","id":18,"commune_id":52},{"name_lat":"MOULAY RACHID","id":19,"commune_id":52},{"name_lat":"MERS SULTAN","id":20,"commune_id":52},{"name_lat":"SIDI BERNOUSSI","id":21,"commune_id":52},{"name_lat":"AIN SEBAA","id":22,"commune_id":52},{"name_lat":"SIDI MOUMEN","id":23,"commune_id":52},{"name_lat":"SBATA","id":24,"commune_id":52},{"name_lat":"ASSOUKHOUR ASSAWDA","id":25,"commune_id":52},{"name_lat":"ANFA","id":26,"commune_id":52},{"name_lat":"CHARF-MGHOGHA","id":27,"commune_id":117},{"name_lat":"CHARF-SOUANI","id":28,"commune_id":117},{"name_lat":"BNI MAKADA","id":29,"commune_id":117},{"name_lat":"TANGER-MEDINA","id":30,"commune_id":117},{"name_lat":"EL MARINIYINE","id":32,"commune_id":264},{"name_lat":"JNAN EL OUARD","id":33,"commune_id":264},{"name_lat":"AGDAL","id":34,"commune_id":264},{"name_lat":"FES-MEDINA","id":35,"commune_id":264},{"name_lat":"ZOUAGHA","id":36,"commune_id":264},{"name_lat":"SAISS","id":37,"commune_id":264},{"name_lat":"MARRAKECH-MEDINA","id":38,"commune_id":269},{"name_lat":"MARRAKECH-MENARA","id":39,"commune_id":269},{"name_lat":"GUELIZ","id":40,"commune_id":269},{"name_lat":"SIDI YOUSSEF BEN ALI","id":41,"commune_id":269},{"name_lat":"ANNAKHIL","id":42,"commune_id":269}],
          currentProvinces: [],
          currentCommunes: [],
          currentArrondissements: []
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

  methods: {
      getProvincesFromBackend() {
          axios.get(this.SITE_URL+'/api/v1/provinces')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , regionItem : item.region_id , agencyItem : item.agency_id }));
                    console.log(data);
                    console.log(res);
                })
      },
      getRegionsFromBackend() {
          axios.get(this.SITE_URL+'/api/v1/regions')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , regionItem : item.region_id , agencyItem : item.agency_id }));
                    console.log(data);
                    console.log(res);
                })
      },
      handleSubmit() {
        this.$emit('step', 3);
        this.$emit('data', {
            province_id: this.province_id,
            commune_id: this.commune_id,
            arrond_id: this.arrond_id,
            address: this.address,
            agency_id: this.getAgencyId(this.province_id)
        })
        //console.log(this.province_id + " " + this.commune_id + " " + this.arrond_id + " " + this.address)
      },
      goBack() {
        this.$emit('step', 1);
      },
      getAgencyId(province_id) {
          for(let province of this.provinces) {
              if(province.id === province_id) {
                return province.agency_id;
              }
          }
      },
      getProvinces(event) {
          console.log(event.target.value);
        this.currentProvinces = [];
        for(let i = 0; i < this.provinces.length; i++) {
            if (this.provinces[i].region_id === parseInt(event.target.value)) {
                this.currentProvinces.push(this.provinces[i])
            }
        }
        console.log(this.currentProvinces);
      },
      getCommunes(event) {
        this.currentCommunes = [];
        for(let i = 0; i < this.communes.length; i++) {
            if (this.communes[i].province_id === parseInt(event.target.value)) {
                this.currentCommunes.push(this.communes[i])
            }
        }
        console.log(this.currentCommunes);
      },
      getArrondissements(event) {
        this.currentArrondissements = [];
        for(let i = 0; i < this.arrondissements.length; i++) {
            if (this.arrondissements[i].commune_id === parseInt(event.target.value)) {
                this.currentArrondissements.push(this.arrondissements[i]);
            }
        }
        console.log(this.currentArrondissements)
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
