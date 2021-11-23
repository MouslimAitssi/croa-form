
<template>
  <div id="app">
    <InformationsPersonnelles myName="mouslim aitssi" :step="step" @step="updateStep" @data="updatePersonalInfos"/>
    <InformationsDiplome :step="step" @step="updateStep" @data="updateDiplomeInfos"/>
    <InformationsAdresse :step="step" @step="updateStep" @data="updateAdresseInfos"/>
    <InformationsAutorisation :step="step" @step="updateStep" @data="updateAutorisationInfos" :forme_id="form.forme_id"/>
  </div>
</template>

<script>
import InformationsPersonnelles from './components/InformationsPersonnelles.vue'
import InformationsDiplome from './components/InformationsDiplome.vue'
import InformationsAdresse from './components/InformationsAdresse.vue'
import InformationsAutorisation from './components/InformationsAutorisation.vue'


export default {
  name: 'App',

  data () {
    return {
      step: 1,
      form: {
        gender: "",
        fullname: "",
        birthday: "",
        mobile: "",
        province_id: "",
        commune_id: "",
        arrond_id: "",
        address: "",
        mode_id: "",
        forme_id: "5",
        employer: "",
        business: "",
        ice: "",
        date_diplomat: "",
        diplomat_title: "",
        university: "",
        autorisation_number: "",
        date_autorisation: "",
        cin_doc: "",
        diplomat_doc: "",
        autorisation_doc: "",
        regularity_doc: "",
        work_doc: ""
      }
    }
  },
  components: {
    InformationsPersonnelles,
    InformationsDiplome,
    InformationsAdresse,
    InformationsAutorisation
  },
  methods: {
    updateStep(step) {
      this.step = step;
    },
    updatePersonalInfos(infos) {
      this.form.gender = infos.gender;
      this.form.fullname = infos.fullname;
      this.form.birthday = infos.birthday;
      this.form.mobile = infos.mobile;
      this.form.mode_id = infos.mode_id;
      this.form.forme_id = infos.forme_id;
      this.form.cin_doc = infos.cin_doc;
      console.log(this.form.fullname+" "+this.form.gender+" "+this.form.birthday+" "+this.form.mobile+" "+ this.form.mode_id + " " +this.form.forme_id + " " + this.form.cin_doc);
    },
    updateDiplomeInfos(infos) {
      this.form.diplomat_title = infos.diplomat_title;
      this.form.date_diplomat = infos.date_diplomat;
      this.form.diplomat_doc = infos.diplomat_doc;
      console.log(this.form.diplomat_title + " " + this.form.date_diplomat + " " + this.form.diplomat_doc);
    },
    updateAdresseInfos(infos) {
      this.form.province_id = infos.province_id;
      this.form.commune_id = infos.commune_id;
      this.form.arrond_id = infos.arrond_id;
      this.form.address = infos.address;
      console.log(this.form.province_id + " " + this.form.commune_id + " " + this.form.arrond_id + " " + this.form.address);
    },
    updateAutorisationInfos(infos) {
      this.form.autorisation_number = infos.autorisation_number;
      this.form.date_autorisation = infos.date_autorisation;
      this.form.employer = infos.employer;
      this.form.society = infos.society;
      this.form.ice = infos.ice;
      this.form.autorisation_doc = infos.autorisation_doc;
      this.form.regularity_doc = infos.regularity_doc;
      this.form.job_doc = infos.job_doc;
      console.log(this.form.ice + " " + this.form.employer + " " + this.form.society + " " + this.form.autorisation_number + " " + this.form.date_autorisation + " " + this.form.autorisation_doc + " " + this.form.regularity_doc);
    },
  }

}
</script>

<style>

@import'~bootstrap/dist/css/bootstrap.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
