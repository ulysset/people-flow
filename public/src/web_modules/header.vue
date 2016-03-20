<template>
  <header class="container">
    <a class="logo" v-link="'/map'"><img src="../assets/img/logo.svg" alt="Future Grant"></a>
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item --help"><a href="https://github.com/ulysset/people-flow" class="nav-link --share --github"></a></li>
        <li class="nav-item --help"><a href="#" target="_blank" class="nav-link --share --facebook"></a></li>
        <li class="nav-item --help"><a href="https://twitter.com/intent/tweet?text=Futuregrant&url=https://still-fortress-88655.herokuapp.com" target="_blank" class="nav-link --share --twitter"></a></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="sass" scoped>

  @import "./theme";

  $logoWidth: 136px;

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
    position: relative;
    top: -3px;
    width: $logoWidth;
    margin: 0 0 15px;
  }

  .nav {
    display: inline-block;
    position: relative;
    top: 1px;
    padding-left: 30px;
    width: calc(100% - #{$logoWidth} - 10px);
    box-sizing: border-box;

    &-list {
      padding: 0;
    }

    &-item {
      display: inline-block;

      & + & {
        margin-right: 10px;
      }

      &.--help{
        float: right;
      }
    }

    &-link {
      text-transform: uppercase;
      text-decoration: none;
      font-size: 12px;
      color: $primaryColor;
      opacity: .25;
      transition: opacity ease .15s;

      &:hover {
        opacity: 1;
      }

      &.--share{
        padding: 0 10px;
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: center;
        opacity: 1;

        &.--github{
          background-image: url(../assets/img/github.svg);
        }

        &.--facebook{
          background-image: url(../assets/img/facebook.svg);
          background-size: 14px 14px;
        }

        &.--twitter{
          background-image: url(../assets/img/twitter.svg);
        }

        &:hover {
          opacity:.5;
        }
      }
    }
  }

</style>
