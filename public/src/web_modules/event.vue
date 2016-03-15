<template>
    <ul class="menu">
      <img src="../assets/img/Logo.svg"/ class="logo">
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

    <h1>Guerre en Syrie</h1>

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
      color:#a8a8a8;
      padding-top:40px;
    }
  }

  .title {
    margin-bottom:10px;
    font-size: 22px;
    color: black;
  }

  .back {
    width:20px;
    height:20px;
    padding:20px;
    background:#D6D6D6;
    border-radius:50%;

    &:hover {
      opacity:.7;
    }
  }


  .events{
    padding-top:50px;

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
      color:#a8a8a8;
    }

  }

</style>






<script>

  // export default {
  //
  // }

</script>
