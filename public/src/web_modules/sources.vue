<template>
  <div class="container">
    <h2 class="title">Sources</h2>
    <a class="back" v-link="'/map'">Back</a>
  </div>
</template>

<style lang="sass" scoped>

  .container {
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
