<template>
  <header class="container">
    <a class="logo" v-link="'/map'"><img src="../assets/img/logo.svg" alt="Future Grant"></a>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item"><a v-link="'/sources'" class="nav-link">Sources</a></li>
        <li class="nav-item"><a v-link="'/'" class="nav-link">Copyright</a></li>
        <li class="nav-item"><a href="https://github.com/ulysset/people-flow" class="nav-link">Github</a></li>
        <li class="nav-item"><a href="https://twitter.com/intent/tweet?text=Futuregrant&url=http://localhost:8080/#!/event" target="_blank" class="nav-link">Partager</a></li>
        <li class="nav-item --help"><a v-link="'/'" class="nav-link">Besoins d'aide ?</a></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="sass" scoped>

  @import "./theme";

  $logoWidth: 140px;

  .container {
    position: absolute;
    top: 0;
    z-index: 5;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: white;
    border-bottom: 1px solid mix($primaryColor, white, 12%);
  }

  .logo{
    display: inline-block;
    width: $logoWidth;
    margin: 15px 0;
  }

  .nav {
    display: inline-block;
    position: relative;
    top: -2px;
    padding-left: 30px;
    width: calc(100% - #{$logoWidth} - 10px);
    box-sizing: border-box;

    &-list {
      padding: 0;
    }

    &-item {
      display: inline-block;

      & + & {
        margin-left: 20px;
      }

      &.--help {
        float: right;
      }
    }

    &-link {
      text-transform: uppercase;
      text-decoration: none;
      font-size: 12px;
      color: #ccc;
      transition: color ease .15s;

      &:hover {
        color: $primaryColor;
      }
    }
  }

</style>
