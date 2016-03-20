<template>
  <div class="country">
    <span class="title">France</span>
  </div>
</template>

<style lang="sass" scoped>

  @import "../theme";

  .country {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
    z-index: 5;
  }

  .title {
    color: $secondaryColor;
    font-size: 22px;
  }

</style>
