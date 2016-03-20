<template>
  <app-header></app-header>

  <div class="wrapper">
<div class="head">
<img src="../assets/img/back-to-map.svg" alt="back-to-map" />
<p>Évènements 1980</p>
<h1>La chute du mur de Berlin</h1>
</div>

<h2>Le soir du 9 novembre 1989, l'Europe connaît l'un de ses plus gros changements.</h2>


  <!-- <a v-link="'/map'" class="back"></a>
  <a href="#" class="left_arrow"></a>
  <span>ÉVÈNEMENTS 2014</span>
  <a href="#" class="right_arrow"></a>
  <h1>Chute du mur de Berlin</h1> -->

  </div>


</template>

<style lang="sass" scoped>

  .wrapper {
    margin: auto;
    text-align: center;
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
    img{
      padding-top:150px;
    }

    p{
      padding-top:70px;
      font-size:25px;
      font-family:'Minion';
      margin:auto;
    }
    h1{
      margin:auto;
      padding-top:5px;
      font-size: 38px;
      font-family:'Brandon_thin';
    }
}

h2{
  width:700px;
  margin:auto;
  padding-top:30px;
  color:#5D5D5D;
  font-size:26px;
}

  a {
    width:15px;
    height:15px;
    padding:10px;
    border-radius:50%;
    display:inline-block;
    cursor:pointer;
    background-repeat:no-repeat;
    background-position:center center;
    &:hover{
      opacity:.7;
    }
  }

  .left_arrow{
    background-image:url(../assets/img/left_arrow.svg);
    background-color:#ebebeb;
  }
  .right_arrow{
    background-image:url(../assets/img/right_arrow.svg);
    background-color:#ebebeb;
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
