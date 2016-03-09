<template>
  <div class="header">
    <h2 class="title">Stats</h2>
    <a v-link="'hello'">Back</a>
  </div>
</template>

<script>
  export default {
    // ...
  }
</script>

<style scoped>

*{
text-align:center;
}

.header{
  padding-top:200px;
}

  .title {
    font-size: 42px;
    color: green;
    margin:auto;
    font-family: Brandon;
  }

  a{
    text-decoration: none;
  }

  a:hover{
    text-decoration: underline;
  }


p{
margin:50px 0 80px 0;
}

</style>
