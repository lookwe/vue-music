<template>
  <div class="main">
    <searchnva></searchnva>

    <!--轮播图-->
    <slider></slider>

    <!--今日推荐-->
    <today></today>

    <!--热门歌手-->
    <musicSong></musicSong>

    <!-- 音乐榜 -->
    <div class="random">
      <img width="95%" src="//static1.qianqian.com/web/st/images/banner-ting.6c54584ee46aec38.jpg" @click="randomMusic">
    </div>
    <musicNav @get_music="getMusic"></musicNav>

    <!--实力歌手-->
    <keep-alive>
      <singer></singer>
    </keep-alive>

    <myfooter></myfooter>
  </div>
</template>

<script>
import searchnva from '../components/search_nav'
import slider from '../components/Swiper'
import today from '../page/TodayPush'
import musicNav from '../page/MusicNav'
import musicSong from  '../page/Song'
import singer from '../page/Singer'
import myfooter from '../components/footer'
export default {
  name:'index',
  inject:['getMusics'],
  methods:{
    getMusic(obj){
      this.$emit('get_music',obj)
    },
    randomMusic(){
      //让父组件 启动getMusics() 方法
      this.getMusics()
    }
  },
  components:{
    searchnva,
    slider,
    today,
    musicNav,
    musicSong,
    singer,
    myfooter,
  }
}
</script>

<style>
  /*饿了么*/
  .row_wrapper{
    width: 100%;
    padding-bottom: 1rem;
    background-color: #fff;
  }
  .row_wrapper .row_content{
    width: 94%;
    margin: 0 auto;
    padding-top: .6rem;
  }
  .col_content{
    width: 92.6%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: .4rem;
  }
  .col_content .song-info{
    margin-top: .5rem;
  }
  .col_content .song-info p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*广告图片*/
  .random{
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
  }


</style>
