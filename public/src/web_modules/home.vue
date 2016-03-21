<template>
  <div>
    <div style="position: fixed; z-index: -99; width: 106%; height: 106%; left: -3%; top: -%">
      <iframe frameborder="0" height="100%" width="100%"
        src="https://youtube.com/embed/tw-q-hG0owc?loop=1&autoplay=1&controls=0&showinfo=0&autohide=1&playlist=tw-q-hG0owc">
      </iframe>
    </div>
    <a v-link="'/'"><img src="../assets/img/logo.svg"/ class="logo"></a>
    <a class="button" v-link="'/map'">Découvrir l'expérience</a>
  </div>
</template>

<style lang="sass" scoped>

  @import "./theme";

  .logo{
    width:150px;
    margin: 24px 30px;
    opacity: .25;
  }

  .button {
    display: block;
    position: absolute;
    left: 50%;
    bottom: 75px;
    transform: translateX(-50%);
    padding: 15px 22px 16px;
    background-color: white;
    border-radius: 3px;
    text-transform: uppercase;
    text-decoration: none;
    color: $primaryColor;
    font-size: 14px;

    &:hover {
      color: rgba($primaryColor, .5);
    }
  }

</style>
