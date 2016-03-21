<template>
  <app-header></app-header>

  <div class="wrapper">
<div class="head">
<a v-link="'/map'" class="back"></a>
<p class="event">Évènements 1980</p>
<h1>La chute du mur de Berlin</h1>
</div>

<h2>Le soir du 9 novembre 1989, l'Europe connaît l'un de ses plus gros changements.</h2>

<p>
   L'atmosphère est tendue, en effet les dictatures du bloc soviétique sont en train de tomber tour à tour notamment avec la doctrine Brejnev. Peu après 19h, à la sortie d’une conférence, Günter Schabowski annonce qu’il y aura des nouvelles règlementations pour sortir de la RDA (Berlin Est).
</p>

<div class="berlin-wall">
<img src="../assets/img/event2.jpg" alt="mur-berlin" />
<span>Le Mur durant les années 80</span>
</div>


<p>
  Suite à cette annonce, beaucoup de berlinois de l’Est se rassemblent devant le mur pour demander leurs visa. À 23h30, le flux était tel que les gardes frontières n’ont eu d’autre choix que d’ouvrir définitivement la frontière à l’Ouest. Près de 20 000 personnes passèrent sur le pont de Bösebrücke au cours de l’heure qui suivit.
</p>

<div class="image image-2">
<p class="citation">“ 20 000 personnes passèrent sur le pont de Bösebrücke au cours de l’heure qui suivit ”</p>
</div>


<h2>Cette révolution se produisit sans tir, ni mort, ni blessé</h2>


<p>
  L'euphorie avait gagné la ville entière. Une ambiance de fête populaire régna sur le Kurfürstendamm pendant plusieurs jours. Le mur fut détruit complètement en juin de l’année suivante. Armés de marteaux, des collectionneurs viennent des 4 coins du monde pour avoir un morceau de ce mur resté plus de 28ans.
</p>

<div class="image image-3"></div>


<h2 class="now">Et maintenant ?</h2>

<p>Aujourd’hui, on entends de nouveau des propositions de séparations de frontières de la part des pays de l’Union Européenne, et des barrières de fils barbelés font leur apparition, moins brutaux visuellement qu’un mur en béton…</p>

<footer>
  <span class="left_arrow">Évènement précédent</span>
  <a v-link="'/map'" class="back"></a>
  <span class="right_arrow">Évènement suivant</span>
</footer>

  </div>


</template>

<style lang="sass" scoped>

  .wrapper {
    margin: auto;
  }

.head{
    width:100%;
    height:539px;
    display:block;
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center center;
    background-image:url(../assets/img/event1.jpg);
    margin:auto;
    text-transform:uppercase;
    color:white;
    text-align: center;
    a{
      width:160px;
      height:50px;
      padding:10px;
      margin-top:150px;
      display:inline-block;
      cursor:pointer;
      background-repeat:no-repeat;
      background-position:center center;
      background-size:250px 50px;
      background-image:url(../assets/img/back-white.svg);
      &:hover{
        opacity:.7;
      }
    }

    .event{
      padding-top:70px;
      font-size:25px;
      margin:auto;
      font-family:'Brandon';
    }
    h1{
      margin:auto;
      padding-top:5px;
      font-size: 38px;
      font-family:'Brandon_thin';
    }
}

h2{
  width:680px;
  margin:auto;
  padding-top:30px;
  margin-bottom:-30px;
  color:#5D5D5D;
  font-size:30px;
  text-align: center;
}

p{
    width:580px;
    margin:auto;
    padding-top:100px;
    font-size:22px;
}

.berlin-wall{
    width:650px;
    height:300px;
    padding-top:50px;
    margin:auto;
    img{
      width:100%;
    }
    span{
      text-transform:uppercase;
      float:right;
      text-align:right;
    }
}

.image{
    width:100%;
    height:539px;
    display:block;
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center center;
    margin:auto;
    margin-top:60px;
    text-align: center;
}

.image-2{
  background-image:url(../assets/img/event3.jpg);
  filter: brightness(.7);
  .citation{
    padding-top:300px;
    width:600px;
    color:white;
    font-size:23px;
  }
}

.image-3{
  background-image:url(../assets/img/event4.jpg);
  filter: brightness(.7);
}

.now{
  text-align:left;
  padding-left:100px;
  margin-bottom:-85px;
}

footer{
  text-align:center;
  padding-top:100px;
  padding-bottom:100px;
    a, span {
      width:170px;
      height:15px;
      padding:10px 10px 10px 14px;
      display:inline-block;
      cursor:pointer;
      background-repeat:no-repeat;
      text-decoration:none;
      text-transform: uppercase;
      font-size: 13px;
      color: black;

      &:hover{
        opacity:.5;
      }
    }

    .left_arrow{
      background-image:url(../assets/img/left_arrow.svg);
      background-position:0px 8px;
    }
    .right_arrow{
      background-image:url(../assets/img/right_arrow.svg);
      background-position:160px 8px;
    }
    .back{
      width:170px;
      height:30px;
      margin-bottom:-20px;
      background-image:url(../assets/img/back-black.svg);
      background-position:center center;
      background-size:250px 50px;
    }
}





</style>

<script>
  import Vue from 'vue';
  Vue.component('app-header', require('./header'));
  export default {
    ready() {
      // Here
    }
  }

</script>
