<template>
  <div class="container">
    <a v-link="'/'"><img src="../assets/img/Logo.svg"/ class="logo"></a>
    <p class="description">You are about to begin an experiment about the stream of migrants since 1960.</p>
    <a class="button" v-link="'map'">BEGIN EXPERIMENT</a>
  </div>
</template>

<style lang="sass" scoped>

  .container {
    margin: auto;
    text-align: center;
  }

  .description {
    font-size:20px;
    margin: 20px 0 20px;
  }

  .logo{
    width:300px;
    margin: 30px 0 30px;
  }

  .button {
    display: inline-block;
    padding: 17px;
    background: #f1f1f1;
    border: 1px solid #c8c8c8;
    border-radius: 3px;
    text-decoration: none;
    color: black;
    margin-top:20px;

    &:hover{
      background: #e7e7e7;
    }
  }

</style>
