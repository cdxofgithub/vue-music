<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .singer-detail
    position fixed
    z-index 100
    top 0
    right 0
    left 0
    bottom 0
    background $color-background

  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
