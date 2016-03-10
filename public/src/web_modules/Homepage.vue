<template>
  <div class="container">
    <h2 class="title">Futuregrant</h2>
    <p class="description">You are about to begin an experiment about the stream of migrants since 1980.</p>
    <a class="button" v-link="'map'">BEGIN EXPERIMENT</a>
  </div>
</template>

<style lang="sass" scoped>

  .container {
    margin: auto;
    text-align: center;
  }

  .title {
    margin: 0 0 30px;
    font-size: 42px;
    color: black;
  }

  .description {
    margin: -20px 0 20px;
    color: grey;
  }

  .button {
    display: inline-block;
    padding: 17px;
    background: rgb(241, 241, 241);
    border: 1px solid rgb(200, 200, 200);
    border-radius: 3px;
    text-decoration: none;
    color: black;

    &:hover{
      background: transparent;
    }
  }

</style>
