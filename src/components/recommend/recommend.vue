<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">  <!--v-if 是为了确保recommends中有值-->
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <!--needclick 解决轮播图片不能点击的问题-->
                <img class="needclick" @load="loadImage" :src="item.picUrl">  <!--有图片被渲染调用loadImage-->
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60"/>   <!-- v-lazy 图片懒加载-->
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImage() {
        if (!this.checkLoad) {
          this.$refs.scroll.refresh()
          this.checkLoad = true
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './recommend.styl'
</style>
