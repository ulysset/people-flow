<template>
  <div>
    <div style="position: fixed; z-index: -99; width: 106%; height: 106%; left: -3%; top: -%">
      <iframe frameborder="0" height="100%" width="100%"
        src="https://youtube.com/embed/tw-q-hG0owc?loop=1&autoplay=1&controls=0&showinfo=0&autohide=1&playlist=tw-q-hG0owc">
      </iframe>
    </div>
    <div class="container_home">
      <a v-link="'/'"><img src="../assets/img/logo.png"/ class="logo"></a>
      <p class="description">Une carte interactive humaine</p>
      <a class="button" v-link="'map'">COMMENCER</a>
    </div>
  </div>
</template>

<style lang="sass" scoped>

  @import "./theme";

  .container_home {
    width:600px;
    text-align: center;
    z-index:10;
    position:absolute;
    left:calc(50% - 300px);
    top:50%;
    transform:translateY(-50%);
  }

  .description {
    font-size:20px;
    margin: 2px 0 10px;
    color:white;
    text-transform:uppercase;
    font-family:'Brandon_thin';
  }

  .logo{
    width:300px;
    margin: 20px 0 20px;
  }

  .button {
    width:150px;
    display: inline-block;
    padding: 17px;
    border-radius: 50px;
    text-decoration: none;
    margin-top:40px;
    border: 3px solid white;
    color:white;
    transition:all ease .6s;

    &:hover{
      opacity: .75;
    }
  }

</style>
