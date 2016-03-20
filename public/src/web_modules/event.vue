<template>
  <app-header></app-header>
  <div class="wrapper">

      <a v-link="'/map'" class="back"></a>
      <a href="#" class="left_arrow"></a>
      <span>ÉVÈNEMENTS 2014</span>
      <a href="#" class="right_arrow"></a>
      <h1>Chute du mur de Berlin</h1>

    <div class="timeline" v-el:timeline></div>
    <div class="content">
      <article>
        <img src="../assets/img/berlin2.jpg"/>
        <p>« Le Mur de la honte s'écroule »</p>
      </article>
      <article>
        <img src="../assets/img/berlin1.jpg"/>
        <p>« La libération, enfin. »</p>
      </article>

      <h2>“ Le mur de la honte s'écroule ”</h2>

      <article>
        <img src="../assets/img/berlin1.jpg"/>
        <p>« Le Mur de la honte s'écroule »</p>
      </article>
      <article>
        <img src="../assets/img/berlin2.jpg"/>
        <p>« La libération, enfin. »</p>
      </article>
    </div>
  </div>


</template>

<style lang="sass" scoped>
  .wrapper {
    padding-top:100px;
    margin: auto;
    text-align: center;
  }
  span {
    margin:0;
    display:inline-block;
    font-size:20px;
    padding:0 30px;
    position:relative;
    top: -10px;
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
  .back{
    background-image:url(../assets/img/cross.svg);
    background-color:#ebebeb;
    display:block;
    margin:auto;
    margin-bottom:20px;
    background-size:12px 12px;
  }

  h1 {
    font-size: 38px;
    font-family: 'Brandon_thin';
    font-weight: 200;
  }

  .timeline {
    width:1px;
    height:400px;
    background:#a8a8a8;
    position:fixed;
    margin:auto;
    left:50%;
    transform:translateX(-50%);
    margin-top:20px;
    transition: top ease .6s;
  }

  .content{
    article{
      width:500px;
      display:inline-block;
      margin:30px 10px;
      img{
        width:70%;
      }
    }
  }

  h2{
    margin:auto;
    width:590px;
    height:60px;
    padding-top:0;
    font-size:45px;
    background:#f0f2e3;
    color:white;
    font-family:'Brandon_black';
  }

</style>

<script>
  import Vue from 'vue';
  Vue.component('app-header', require('./header'));
  export default {
    ready() {
      const $timeline = this.$els.timeline;
      window.onscroll = function(e) {
        const scrollY = window.scrollY;
        if (scrollY > 250) $timeline.style.top = (window.innerHeight/2-220) + "px";
        else $timeline.style.top = "360px";
      };
    }
  }

</script>
