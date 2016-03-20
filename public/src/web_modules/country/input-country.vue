<template>


  <div class="search">

    <div class="left">
      <div class="arrow arrow_left"></div>
    <input v-model="searchCountry1" type="text" placeholder="Recherche..." value="{{searchCountry1}}" class="input_left"/>
    <ul class="ul_left">
      <li v-on:click="selectCountry1(country)" v-for="country in countries | filterBy searchCountry1 in 'name'">{{ country.name }}</li>
    </ul>
    </div>

    <div class="right">
      <div class="arrow arrow_right"></div>
    <input v-model="searchCountry2" type="text" placeholder="Recherche..." value="{{searchCountry2}}" class="input_right"/>
    <ul class="ul_right">
      <li v-on:click="selectCountry2(country)" v-for="country in countries | filterBy searchCountry2 in 'name'">{{ country.name }}</li>
    </ul>
    </div>

  </div>

</template>

<style lang="sass" scoped>

  .container {
    margin: auto;
    text-align: center;
  }

  .title {
    margin-bottom:10px;
    font-size: 18px;
    color: black;
  }

  .back {
    color: grey;

    &:hover {
      color: black;
    }
  }

  .search{
    width:500px;
    height: 260px;
    color:#424242;
    margin:auto;
    margin-top:50px;
    ul{
      overflow:scroll;
      height:0;
      transition:all ease .3s;
      li{
        list-style-type: none;
        text-transform: uppercase;
        font-size: 12px;
        padding-top:12px;
      }
    }
    input[type="text"]{
      padding: 10px;
      border-top: solid 0px;
      border-left: solid 0px;
      border-right: solid 0px;
      border-bottom: solid 2px #c9c9c9;
      transition: border 0.3s;
      display: block;
      margin: auto;
      width: 150px;
      font-size: 12px;
      color:#424242;
      text-transform: uppercase;
    }
    input[type="text"]:focus,input[type="text"].focus {
      border-bottom: solid 2px #484848;
      outline:none;
    }
    input[type="text"]::-webkit-input-placeholder {
      text-transform: lowercase;
    }
    .left{
        width:45%;
        float:left;
        border:2px solid #123A5B;
    }

    .right{
      float:right;
      width:45%;
      border:2px solid #123A5B;
    }
  }

  .arrow{
    width:8px;
    height:8px;
    padding:8px;
    border-radius:50%;
    display:none;
    position:absolute;
    cursor:pointer;
    margin-left:4px;
    margin-top:7px;
    background-repeat:no-repeat;
    background-position:center center;
    background-color:#ebebeb;
    background-size:10px 10px;
    background-image:url('../../assets/img/cross.svg');
  }

</style>


<script>
  import Vue from 'vue';

  export default {
    data() {
      return {
        searchCountry1: '',
        searchCountry2: '',
        countries: [
          { slug:"ABW", name:"Aruba" },
          { slug:"AFG", name:"Afghanistan" },
          { slug:"AGO", name:"Angola" },
          { slug:"AIA", name:"Anguilla" },
          { slug:"ALB", name:"Albanie" },
          { slug:"AND", name:"Andorre" },
          { slug:"ANT", name:"Antilles" },
          { slug:"ARE", name:"Emirats arabes unis" },
          { slug:"ARG", name:"Argentine" },
          { slug:"ARM", name:"Arménie" },
          { slug:"ASM", name:"Samoa" },
          { slug:"ATA", name:"Antarctique" },
          { slug:"ATG", name:"Antigua et Barbuda" },
          { slug:"AUS", name:"Australie" },
          { slug:"AUT", name:"Autriche" },
          { slug:"AZE", name:"Azerbaïdjan" },
          { slug:"BDI", name:"Burundi" },
          { slug:"BEL", name:"Belgique" },
          { slug:"BEN", name:"Bénin" },
          { slug:"BFA", name:"Burkina faso" },
          { slug:"BGD", name:"Bangladesh" },
          { slug:"BGR", name:"Bulgarie" },
          { slug:"BHR", name:"Bahreïn" },
          { slug:"BHS", name:"Bahamas" },
          { slug:"BIH", name:"Bosnie Herzégovine" },
          { slug:"BLR", name:"Bélarus" },
          { slug:"BLZ", name:"Belize" },
          { slug:"BMU", name:"Bermudes" },
          { slug:"BOL", name:"Bolivie" },
          { slug:"BRA", name:"Brésil" },
          { slug:"BRB", name:"Barbade" },
          { slug:"BRN", name:"Brunéi Darussalam" },
          { slug:"BTN", name:"Bhoutan" },
          { slug:"BVT", name:"Bouvet" },
          { slug:"BWA", name:"Botswana" },
          { slug:"CAF", name:"République centrafricaine" },
          { slug:"CAN", name:"Canada" },
          { slug:"CCK", name:"Îles Cocos" },
          { slug:"CHE", name:"Suisse" },
          { slug:"CHL", name:"Chili" },
          { slug:"CHN", name:"Chine" },
          { slug:"CIV", name:"Côte d'Ivoire" },
          { slug:"CMR", name:"Cameroun" },
          { slug:"COG", name:"Congo" },
          { slug:"COK", name:"Îles Cook" },
          { slug:"COL", name:"Colombie" },
          { slug:"COM", name:"Comores" },
          { slug:"CPV", name:"Cap-Vert" },
          { slug:"CRI", name:"Costa rica" },
          { slug:"CUB", name:"Cuba" },
          { slug:"CXR", name:"Île Christmas" },
          { slug:"CYM", name:"Îles Caïmans" },
          { slug:"CYP", name:"Chypre" },
          { slug:"CZE", name:"République Tchèque" },
          { slug:"DEU", name:"Allemagne" },
          { slug:"DJI", name:"Djibouti" },
          { slug:"DMA", name:"Dominique" },
          { slug:"DNK", name:"Danemark" },
          { slug:"DOM", name:"République Dominicaine" },
          { slug:"DZA", name:"Algérie" },
          { slug:"ECU", name:"Equateur" },
          { slug:"EGY", name:"Egypte" },
          { slug:"ERI", name:"Erythrée" },
          { slug:"ESH", name:"Sahara occidental" },
          { slug:"ESP", name:"Espagne" },
          { slug:"EST", name:"Estonie" },
          { slug:"ETH", name:"Ethiopie" },
          { slug:"FIN", name:"Finlande" },
          { slug:"FJI", name:"Fidji" },
          { slug:"FLK", name:"Îles Falkland" },
          { slug:"FRA", name:"France" },
          { slug:"FRO", name:"Îles Féroé" },
          { slug:"FSM", name:"Micronésie" },
          { slug:"GAB", name:"Gabon" },
          { slug:"GBR", name:"Royaume-uni" },
          { slug:"GEO", name:"Géorgie" },
          { slug:"GHA", name:"Ghana" },
          { slug:"GIB", name:"Gibraltar" },
          { slug:"GIN", name:"Guinée" },
          { slug:"GLP", name:"Guadeloupe" },
          { slug:"GMB", name:"Gambie" },
          { slug:"GNB", name:"Guinée-Bissau" },
          { slug:"GNQ", name:"Guinée équatoriale" },
          { slug:"GRC", name:"Grèce" },
          { slug:"GRD", name:"Grenade" },
          { slug:"GRL", name:"Groenland" },
          { slug:"GTM", name:"Guatemala" },
          { slug:"GUF", name:"Guyane française" },
          { slug:"GUM", name:"Guam" },
          { slug:"GUY", name:"Guyana" },
          { slug:"HKG", name:"Hong-kong" },
          { slug:"HND", name:"Honduras" },
          { slug:"HRV", name:"Croatie" },
          { slug:"HTI", name:"Haïti" },
          { slug:"HUN", name:"Hongrie" },
          { slug:"IDN", name:"Indonésie" },
          { slug:"IND", name:"Inde" },
          { slug:"IRL", name:"Irlande" },
          { slug:"IRN", name:"Iran" },
          { slug:"IRQ", name:"Iraq" },
          { slug:"ISL", name:"Islande" },
          { slug:"ISR", name:"Israël" },
          { slug:"ITA", name:"Italie" },
          { slug:"JAM", name:"Jamaïque" },
          { slug:"JOR", name:"Jordanie" },
          { slug:"JPN", name:"Japon" },
          { slug:"KAZ", name:"Kazakhstan" },
          { slug:"KEN", name:"Kenya" },
          { slug:"KGZ", name:"Kirghizistan" },
          { slug:"KHM", name:"Cambodge" },
          { slug:"KIR", name:"Kiribati" },
          { slug:"KNA", name:"Saint-Christophe-et-Niévès" },
          { slug:"KOR", name:"Corée du sud" },
          { slug:"KWT", name:"Koweït" },
          { slug:"LAO", name:"Lao" },
          { slug:"LBN", name:"Liban" },
          { slug:"LBR", name:"Libéria" },
          { slug:"LBY", name:"Libyie" },
          { slug:"LCA", name:"Saint Lucia" },
          { slug:"LIE", name:"Liechtenstein" },
          { slug:"LKA", name:"Sri Lanka" },
          { slug:"LSO", name:"Lesotho" },
          { slug:"LTU", name:"Lituanie" },
          { slug:"LUX", name:"Luxembourg" },
          { slug:"LVA", name:"Lettonie" },
          { slug:"MAC", name:"Macao" },
          { slug:"MAR", name:"Maroc" },
          { slug:"MCO", name:"Monaco" },
          { slug:"MDA", name:"Moldova" },
          { slug:"MDG", name:"Madagascar" },
          { slug:"MDV", name:"Maldives" },
          { slug:"MEX", name:"Mexique" },
          { slug:"MHL", name:"Îles Marshall" },
          { slug:"MKD", name:"Macédoine" },
          { slug:"MLI", name:"Mali" },
          { slug:"MLT", name:"Malte" },
          { slug:"MMR", name:"Myanmar" },
          { slug:"MNG", name:"Mongolie" },
          { slug:"MNP", name:"Îles Mariannes du nord" },
          { slug:"MOZ", name:"Mozambique" },
          { slug:"MRT", name:"Mauritanie" },
          { slug:"MSR", name:"Montserrat" },
          { slug:"MTQ", name:"Martinique" },
          { slug:"MUS", name:"Maurice" },
          { slug:"MWI", name:"Malawi" },
          { slug:"MYS", name:"Malaisie" },
          { slug:"MYT", name:"Mayotte" },
          { slug:"NAM", name:"Namibie" },
          { slug:"NCL", name:"Nouvelle-Calédonie" },
          { slug:"NER", name:"Niger" },
          { slug:"NFK", name:"Île Norfolk" },
          { slug:"NGA", name:"Nigéria" },
          { slug:"NIC", name:"Nicaragua" },
          { slug:"NIU", name:"Niué" },
          { slug:"NLD", name:"Pays-bas" },
          { slug:"NOR", name:"Norvège" },
          { slug:"NPL", name:"Népal" },
          { slug:"NRU", name:"Nauru" },
          { slug:"NZL", name:"Nouvelle-Zélande" },
          { slug:"OMN", name:"Oman" },
          { slug:"PAK", name:"Pakistan" },
          { slug:"PAN", name:"Panama" },
          { slug:"PCN", name:"Pitcairn" },
          { slug:"PER", name:"Pérou" },
          { slug:"PHL", name:"Philippines" },
          { slug:"PLW", name:"Palaos" },
          { slug:"PNG", name:"Papouasie-Nouvelle-Guinée" },
          { slug:"POL", name:"Pologne" },
          { slug:"PRI", name:"Porto Rico" },
          { slug:"PRK", name:"Corée du nord" },
          { slug:"PRT", name:"Portugal" },
          { slug:"PRY", name:"Paraguay" },
          { slug:"PYF", name:"Polynésie française" },
          { slug:"QAT", name:"Qatar" },
          { slug:"REU", name:"Réunion" },
          { slug:"ROM", name:"Roumanie" },
          { slug:"RUS", name:"Russie" },
          { slug:"RWA", name:"Rwanda" },
          { slug:"SAU", name:"Arabie saoudite" },
          { slug:"SDN", name:"Soudan" },
          { slug:"SEN", name:"Sénégal" },
          { slug:"SGP", name:"Singapour" },
          { slug:"SGS", name:"Géorgie du sud" },
          { slug:"SHN", name:"Sainte-Hélène" },
          { slug:"SJM", name:"Svalbard et île Jan Mayen" },
          { slug:"LB", name:"Îles Salomon" },
          { slug:"SLE", name:"Sierra leone" },
          { slug:"SLV", name:"El Salvador" },
          { slug:"SMR", name:"Saint-Marin" },
          { slug:"SOM", name:"Somalie" },
          { slug:"SPM", name:"Saint-Pierre-et-Miquelon" },
          { slug:"STP", name:"Sao Tomé-et-Principe" },
          { slug:"SUR", name:"Suriname" },
          { slug:"SVK", name:"Slovaquie" },
          { slug:"SVN", name:"Slovénie" },
          { slug:"SWE", name:"Suède" },
          { slug:"SWZ", name:"Swaziland" },
          { slug:"SYC", name:"Seychelles" },
          { slug:"SYR", name:"Syrie" },
          { slug:"TCA", name:"Îles Turks et Caïques" },
          { slug:"TCD", name:"Tchad" },
          { slug:"TGO", name:"Togo" },
          { slug:"THA", name:"Thaïlande" },
          { slug:"TJK", name:"Tadjikistan" },
          { slug:"TKL", name:"Tokelau" },
          { slug:"TKM", name:"Turkménistan" },
          { slug:"TMP", name:"Timor-Leste" },
          { slug:"TON", name:"Tonga" },
          { slug:"TTO", name:"Trinité-et-Tobago" },
          { slug:"TUN", name:"Tunisie" },
          { slug:"TUR", name:"Turquie" },
          { slug:"TUV", name:"Tuvalu" },
          { slug:"TWN", name:"Taïwan" },
          { slug:"TZA", name:"Tanzanie" },
          { slug:"UGA", name:"Ouganda" },
          { slug:"UKR", name:"Ukraine" },
          { slug:"URY", name:"Uruguay" },
          { slug:"USA", name:"Etats-Unis" },
          { slug:"UZB", name:"Ouzbékistan" },
          { slug:"VAT", name:"Saint-Siège" },
          { slug:"VCT", name:"Saint Vincent et les Grenadines" },
          { slug:"VEN", name:"Vénézuéla" },
          { slug:"VGB", name:"Iles Vierges britanniques" },
          { slug:"VIR", name:"Iles Vierges des Etats-Unis" },
          { slug:"VNM", name:"Viet Nam" },
          { slug:"VUT", name:"Vanuatu" },
          { slug:"WLF", name:"Wallis et Futuna" },
          { slug:"WSM", name:"Samoa" },
          { slug:"YEM", name:"Yémen" },
          { slug:"YUG", name:"Yougoslavie" },
          { slug:"ZAF", name:"Afrique du Sud" },
          { slug:"ZAR", name:"Zaïre" },
          { slug:"ZMB", name:"Zambia" },
          { slug:"ZWE", name:"Zimbabwe" }
        ],
      };
    },

    ready() {
      let selectinput = document.querySelector('.input_left');
      let selectinput2 = document.querySelector('.input_right');
      let selectul = document.querySelector('.ul_left');
      let selectul2 = document.querySelector('.ul_right');
      let arrow = document.querySelector('.arrow_left');
      let arrow2 = document.querySelector('.arrow_right');
      selectinput.onclick = function() {
        selectul.style.height = "180px";
        arrow.style.display = "block";
        event.stopPropagation();
      };
      selectinput2.onclick = function(event) {
        selectul2.style.height = "180px";
        event.stopPropagation();
      };
      window.onclick = function() {
        selectul.style.height = "0";
        selectul2.style.height = "0";
        arrow.style.display = "none";
        arrow2.style.display = "none";
      };
    },

    methods: {
      selectCountry1(country) {
        this.searchCountry1 = country.name;
        document.querySelector('.ul_left').style.height = "0px";
      },
      selectCountry2(country) {
        this.searchCountry2 = country.name;
        document.querySelector('.ul_right').style.height = "0px";
      }
    }

  }

</script>
