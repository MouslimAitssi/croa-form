import axios from 'axios';

export const GET_REGIONS = 'get_regions';
export const GET_PROVINCES = 'get_provinces';
export const GET_COUNTRIES = 'get_countries';
export const GET_COMMUNES = 'get_communes';
export const GET_ARROND = 'get_arrond';
export const GET_INITIALS = 'get_initials';

export const GET_PROJECT_CATS = 'get_project_cats';
export const GET_DECLARATION_TYPES = 'get_declaration_types';
export const GET_DECLARATIONS = 'get_declarations';



export const SITE_URL = 'https://beta.croatanger.org' ;
// export const SITE_URL = 'http://localhost:8000' ;

const SET_REGIONS = 'set_regions';
const SET_PROVINCES = 'set_provinces';
const SET_COUNTRIES = 'set_countries';
const SET_COMMUNES = 'set_communes';
const SET_ARROND = 'set_arrond';
const SET_INITIALS = 'set_initials';

const SET_PROJECT_CATS = 'set_project_cats';
const SET_DECLARATION_TYPES = 'set_declaration_types';
const SET_DECLARATIONS = 'set_declarations';

const state = {
    token :   document.querySelector('meta[name="csrf-token"]').content ,
    site_url : SITE_URL ,
    selectOptions: {
        maitreDouvrage: [],
        regions: [],
        provinces: [],
        countries: [],
        communes: [],
        arronds: [],
        projectCats: [],
        declarationTypes: [],
        declarations: [],
        currencies :    [
            {"value": "MAD","text": "Dirham Marocain"     },
            {"value": "USD","text": "Dollar Américain"  },
            {"value": "EURO","text": "Euro Union Européan"    }
        ],
    },

    thirdStepOptions: {
        "regimeFoncier": [
            { "value": "IMF", "text": "Immatriculation foncière"  },
            { "value": "TNI", "text": "Terrain non immatriculé"   }
        ],
        "regimeFoncier2":[
            {   "value": "T",    "text": "Titre Foncier"     },
            {   "value": "R",  "text": "Réquisition d'immatriculation"      }
        ],
        "statutFoncier": [
            {  "value": "P",    "text": "Propriété (Melk)"       },
            {
                "value": "ID",    "text": "Immeuble domanial"  },
            {    "value": "TC","text": "Terre collective"     },
            {    "value": "H",  "text": "Habous"     }
        ]
    },
};
const actions = {
    [GET_REGIONS] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/regions')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat}));
                    data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_REGIONS, data);
                    resolve(data);

                })
        })
    },
    [GET_PROVINCES] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/provinces')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , regionItem : item.region_id , agencyItem : item.agency_id }));
                    data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_PROVINCES, data);
                    resolve(data);
                })
        })
    },
    [GET_INITIALS] ({ commit }) {
                return new Promise(resolve => {
                     axios.get(SITE_URL+'/api/v1/get-initials')
                        .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.initial_lat , moral : item.morale , public : item.droitpublic }));
                    // data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_INITIALS, data);
                    resolve(data);
                })
        })
    },
    [GET_COUNTRIES] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/countries')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_fr }));
                    commit(SET_COUNTRIES, data);
                    resolve(data);
                })
        })
    },
    [GET_COMMUNES] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/communes')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , provinceItem : item.province_id}));
                    data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_COMMUNES, data);
                    resolve(data);
                })
        })
    },
    [GET_ARROND] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/arrondissements')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.name_lat , communeItem : item.commune_id}));
                    data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_ARROND, data);
                    resolve(data);
                })
        })
    },
    [GET_PROJECT_CATS] ({ commit }) {
        return new Promise(resolve => {
                axios.get(SITE_URL+'/api/v1/project-cats')
                .then(res => {
                const data = res.data.data.map(item => ({ value: item.id, text: item.label , modif : item.modif , activeItem : item.active}));
        // data.sort((a, b) => (a.text.localeCompare(b.text)))
        commit(SET_PROJECT_CATS, data);
        resolve(data);
    })
    })
    },
    [GET_DECLARATION_TYPES] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/project-types')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.label , categorieItem : item.categorie }));
                    // data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_DECLARATION_TYPES, data);
                    resolve(data);
                })
        })
    },
    [GET_DECLARATIONS] ({ commit }) {
        return new Promise(resolve => {
            axios.get(SITE_URL+'/api/v1/projects')
                .then(res => {
                    const data = res.data.data.map(item => ({ value: item.id, text: item.label, cotisation: item.part_croa ,
                            typeItem : item.type , familyItem : item.famille , domainItem : item.domaine , smin : item.smin , smax : item.smax }));
                    // data.sort((a, b) => (a.text.localeCompare(b.text)))
                    commit(SET_DECLARATIONS, data);
                    resolve(data);
                })
        })
    },
}
const getters = {}
const mutations = {
    [SET_REGIONS] (state, data) {
        state.selectOptions.regions = data;
    }, [SET_PROVINCES] (state, data) {
        state.selectOptions.provinces = data;
    },
    [SET_INITIALS] (state, data) {
        state.selectOptions.maitreDouvrage = data;
    },
    [SET_COUNTRIES] (state, data) {
        state.selectOptions.countries = data;
    },
    [SET_COMMUNES] (state, data) {
        state.selectOptions.communes = data;
    },
    [SET_PROJECT_CATS] (state, data) {
        state.selectOptions.projectCats = data;
    },
    [SET_DECLARATION_TYPES] (state, data) {
        state.selectOptions.declarationTypes = data;
    },
    [SET_DECLARATIONS] (state, data) {
        state.selectOptions.declarations = data;
    },
    [SET_ARROND] (state, data) {
        state.selectOptions.arronds = data;
    },
}
export default {
    state,
    actions,
    mutations,
    getters
}
