<template>
    <ul class="menu">
      <img src="../assets/img/Logo.svg"/ class="logo">
      <li><a v-link="'/sources'" class="link">Sources</a></li>
      <li><a v-link="'/'" class="link">Copyright</a></li>
      <li><a v-link="'https://github.com/ulysset/people-flow'" class="link">Github</a></li>
      <li><a v-link="'/'" class="link">Partager</a></li>
      <li class="help"><a v-link="'/'" class="link">BESOIN D'AIDE ?</a></li>
    </ul>

  <div class="container">
    <h2 class="title">Events</h2>
    <a class="back" v-link="'/map'">Back</a>
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
  }

  .title {
    margin-bottom:10px;
    font-size: 22px;
    color: black;
  }

  .back {
    color: grey;

    &:hover {
      color: black;
    }
  }

</style>






<script>

  // export default {
  //
  // }

</script>

<style lang="sass" scoped>


</style>
