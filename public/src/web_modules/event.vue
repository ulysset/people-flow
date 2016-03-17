<template>
    <ul class="menu">
      <a v-link="'/'"><img src="../assets/img/Logo.svg"/ class="logo"></a>
      <li><a v-link="'/sources'" class="link">Sources</a></li>
      <li><a v-link="'/'" class="link">Copyright</a></li>
      <li><a href="'https://github.com/ulysset/people-flow'" class="link">Github</a></li>
      <li><a href="https://twitter.com/intent/tweet?text=Futuregrant&url=http://localhost:8080/#!/event" target="_blank" class="link">Partager</a></li>
      <li class="help"><a v-link="'/'" class="link">BESOIN D'AIDE ?</a></li>
    </ul>

  <div class="container">

    <a v-link="'/map'"><img class="back" src="../assets/img/close.svg"/></a>

    <div class="events">
    <img src="../assets/img/left_arrow.svg"/>
    <p>ÉVÈNEMENTS 2014</p>
    <img src="../assets/img/right_arrow.svg"/>
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

      <h1 style="margin:auto;font-size:40px;">Lorem ipsum dolor sit amet, consectetur</h1>

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

  .container {
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

    img {
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

    p {
      margin:0;
      display:inline-block;
      font-size:20px;
      padding:0 30px;
    }

  }

</style>

<script>


  export default {

    ready() {
      var $timeline = this.$els.timeline;

      window.onscroll = function(e) {
        var scrollY = window.scrollY;
        if (scrollY > 250)
        $timeline.style.top = (window.innerHeight/2-220) + "px";
        else if (scrollY < 250)
        $timeline.style.top = "360px";
      }

      console.log();

    }

  }

</script>
