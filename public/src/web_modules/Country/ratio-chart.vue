<template>

    <div class="parent-ratio">
      <h1>FRANCE</h1>
      <h2>RATIO IMMIGRANTS - IMMIGRÉS</h2>
      <ul class="years" >
        <li  class="selected" v-for="(indexYear, year) in years" v-on:click="selectIndex($index)" v-bind:class="{'selected': indexYear == activeIndex}">
          {{year}}
        </li>
      </ul>
      <div class="ratio">
        <canvas id="chart" class="chart"></canvas>
        <div v-for="(indexPoint, item) in pointX" class="circle" v-bind:style="{ top: pointY[$index]/2 + 'px', left: pointX[$index]/2 + 'px' }" v-bind:class="{'showDots' : activeIndex == indexPoint }"></div>
      </div>
      <div class="directRatio">
        <div class="baseArriving"></div>
        <div class="baseLeaving"></div>
        <div class="arriving" v-bind:style="{ width : (instantRatioScale[activeIndex] * 100) + '%' }"></div>
        <div class="leaving"></div>
      </div>
      <div class="flowNumber">
        <div class="numberArriving">{{arrival[activeIndex]}}</div>
        <div class="numberDeparture">{{departure[activeIndex]}}</div>
        <div class="numberArriving">ARRIVES</div>
        <div class="numberDeparture">DÉPARTS</div>
      </div>
    </div>
</template>
<script>

export default {
  data() {
    const data = {
      'FRA:ITA':{
        from : 'FRA',
        to:'ITA',
        migrants:[]
      },
      'ITA:FRA':{
        from:'ITA',
        to:'FRA',
        migrants:[]
      }
    };

    data['FRA:ITA'].migrants['1960'] = 12100
    data['FRA:ITA'].migrants['1970'] = 25630
    data['FRA:ITA'].migrants['1980'] = 12030
    data['FRA:ITA'].migrants['1990'] = 17300
    data['FRA:ITA'].migrants['2000'] = 12000

    data['ITA:FRA'].migrants['1960'] = 2521
    data['ITA:FRA'].migrants['1970'] = 25385
    data['ITA:FRA'].migrants['1980'] = 2566
    data['ITA:FRA'].migrants['1990'] = 26778
    data['ITA:FRA'].migrants['2000'] = 2266

    return {
      activeIndex : 0,
      arrival : [],
      departure : [],
      pointX : [],
      pointY : [],
      instantRatioScale : [],
      years : [1960, 1970, 1980, 1990, 2000],
      data,
      selectedCountries: {
        one: 'FRA:ITA',
        two: 'ITA:FRA'
      },
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

    }
  },

  ready() {

    const canvas = document.getElementById('chart')
    const context = canvas.getContext('2d')

    // Set size
    const WIDTH = 940
    const HEIGHT = 220
    canvas.width = WIDTH
    canvas.height = HEIGHT


    let arrival = this.arrival,
         departure = this.departure,
         pointX = this.pointX,
         pointY = this.pointY,
         roundness = 100

    const index1 = this.selectedCountries.one
    const index2 = this.selectedCountries.two

    this.data[index1].migrants.forEach(item => {
      arrival.push(item)
    })
    this.data[index2].migrants.forEach(item => {
      departure.push(item)
    })

    for(let i = 0; i < 5; i++){
      pointX.push((WIDTH/4)*i)
    }
    for(let i = 0; i<5; i++){
      this.instantRatioScale.push( arrival[i]/(arrival[i] + departure[i]));
      pointY.push( arrival[i]/(arrival[i] + departure[i])* HEIGHT )
    }
    context.fillStyle = "#2F6B97"
    context.beginPath()
    context.rect(0, 0, WIDTH, HEIGHT)
    context.fill()
    context.fillStyle = "#F3F0E4"

    context.beginPath()
    context.moveTo(pointX[0], pointY[0])
    for (let i = 1; i < 5; i++){
      context.bezierCurveTo(pointX[i-1] + roundness, pointY[i-1], pointX[i] - roundness, pointY[i], pointX[i], pointY[i])
    }
    context.lineTo(WIDTH, HEIGHT)
    context.lineTo(0, HEIGHT)
    context.fill()
  },

  methods: {
    selectIndex(index) {
      this.$dispatch('selectIndex', index);
    }
  },

  events: {
    selectIndex(index) {
      this.activeIndex = index;
    }
  }
}
</script>

<style scoped>
  .parent-ratio{
    width: 470px;
    height: 600px;
    margin: auto;
  }
  .parent-ratio h2{
    color: #215078;
    text-align: center;
    font-size: 14px;
    margin: 26px;
  }
  .years{
    position: relative;
    width: 500px;
    transform: translateX(-20px);
    display: flex;
    margin: 0;
    padding: 0;
    padding-bottom: 20px;
    justify-content: space-between;
    list-style-type: none;
  }
  .years li {
    padding: 5px;
    border-radius: 10px;
    border: 2px solid transparent;
    transition: all ease-in .2s;
    cursor: pointer;
    font-size: 12px;

  }
  .years li:hover {
    border: 2px solid #2F6B97;
  }
  .years li.selected{
    border: 2px solid #2F6B97;
    transform: scale(1.3);
  }


  .ratio{
    width : 470px;
    height: 110px;
    position: relative;
    margin-bottom: 30px;
  }
  .chart{
    border-radius: 14px;
    transform-origin: left top;
    transform: scale(.5);
  }
  .circle{
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: #2F6B97;
    border: 2px solid #F3F0E4;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.33);
    opacity: 0;
    transition: all .3s;
  }
  .showDots{
    opacity: 1;
  }
  .flowNumber{
    width: 100%;
    position: relative;
    margin-top: 20px;
    color: #2F6B97;
    font-size: 14px;
    font-weight: 600;
  }
  .flowNumber .numberArriving{
    text-align: left;
    display: inline-block;
    width: 49%;
  }
  .flowNumber .numberDeparture{
    text-align: right;
    display: inline-block;
    width: 49%;
  }
  .directRatio{
    width: 470px;
    height: 50px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }
  .directRatio .baseArriving {
    position: absolute;
    left: 0;
    height: 100%;
    width: 20px;
    background-color: #2f6b96;
    z-index: 5;
    border-radius: 10px;
  }
  .directRatio .baseLeaving {
    position: absolute;
    height: 100%;
    width: 20px;
    right: 0;
    background-color: #F3F0E4 ;
    z-index: 5;
    border-radius: 10px;

  }
  .directRatio .arriving{
    transition: all ease .3s;
    position: absolute;
    background-color: #2f6b96;
    z-index: 2;
    height: 100%;
    border-radius: 10px;

  }
  .directRatio .leaving{
    position: absolute;
    background-color: #F3F0E4;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

</style>
