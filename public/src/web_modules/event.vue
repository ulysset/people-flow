<template>
  <app-header></app-header>
  <div class="wrapper">
    <a v-link="'/map'"><img class="back" src="../assets/img/close.svg"/></a>
    <div class="events">
      <a href="#" class="left_arrow"></a>
      <!-- <img src="../assets/img/left_arrow.svg"/> -->
      <span>ÉVÈNEMENTS 2014</span>
      <a href="#" class="right_arrow"></a>
      <!-- <img src="../assets/img/right_arrow.svg"/> -->
      </div>
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

      <h2 style="margin:auto;width:590px;height:60px;padding-top:0px;font-size:45px;background:#f0f2e3;color:white;font-family:Brandon_black;">“ Le mur de la honte s'écroule ”</h2>

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
  .menu {
    position: absolute;
    margin: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    padding: 12px 0;
    background-color: white;
    border-top: #ccc solid 1px;
  }
  .logo{
    width:150px;
    margin:0 45px 0 30px;
  }
  a{
    text-decoration:none;
    color: #ccc;
  }
  li, .link {
    display: inline-block;
    color: #ccc;
    cursor: pointer;
    margin-left: 20px;
    &:hover {
      font-weight: bold;
      color: black;
      cursor: pointer;
    }
  }
  .help{
    float:right;
    margin-right:30px;
  }
  .wrapper {
    padding-top:100px;
    margin: auto;
    text-align: center;
    h1{
      font-size:38px;
      font-family: 'Brandon_thin';
      padding-top:25px;
    }
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
  .title {
    margin-bottom:10px;
    font-size: 22px;
    color: black;
  }
  .back {
    width:15px;
    height:15px;
    padding:15px;
    background:#D6D6D6;
    border-radius:50%;
    &:hover {
      opacity:.7;
    }
  }
  .events{
    padding-top:30px;

  span {
    margin:0;
    display:inline-block;
    font-size:20px;
    padding:0 30px;
    position:relative;
    top: -13px;
  }
  .left_arrow{
    background-image:url(../assets/img/left_arrow.svg);
    background-repeat:no-repeat;
    background-position:center center;
  }
  .right_arrow{
    background-image:url(../assets/img/right_arrow.svg);
    background-repeat:no-repeat;
    background-position:center center;
  }
  a {
    width:25px;
    height:25px;
    padding:10px;
    background:#e6e6e6;
    border-radius:50%;
    display:inline-block;
    cursor:pointer;
    &:hover{
      opacity:.7;
    }
  }
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
