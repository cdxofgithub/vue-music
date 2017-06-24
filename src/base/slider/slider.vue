<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0  // 当前的页面
      }
    },
    props: {
      loop: {   // 是否可以循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: { // 自动轮播
        type: Boolean,
        default: true
      },
      interval: {  // 轮播间隔时间
        type: Number,
        default: 2000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {   // 监听窗口改变事件
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()  // 重新计算，即重新初始化BSscroll
      })
    },
    methods: {
      _setSliderWidth(isResize) {  // 计算并设置slider的宽度
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop && !isResize) {   // !isResize防止width叠加
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {  // 初始化slider
        this.slider = new Bscroll(this.$refs.slider, {
          scrollX: true,  // 允许横向滚动
          scrollY: false, // 不允许纵向滚动
          momenttum: false, // 当快速滑动时是否开启滑动惯性
          snap: true, // 该属性是给 slider 组件使用的，普通的列表滚动不需要配置
          snapLoop: this.loop,  // 是否可以无缝循环轮播
          snapThreshold: 0.3,  // 用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
          snapSpeed: 400,  // 轮播图切换的动画时间
          click: true  // 是否派发click事件
        })

        this.slider.on('scrollEnd', () => {  // 每次滚动会派发一个事件，监听该事件获取当前页面的下标
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {  // 如果当前是循环播放状态，当前的页面下标需要减一， 因为默认会在前后各加一个页面
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)  // 防止手动滑动后瞬间跳转到下次轮播
            this._play()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {  // 和上面一样的逻辑
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)   // （x方向， y方向， 时间间隔）
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import './slider.styl'
</style>
