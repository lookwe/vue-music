<template>
      <div class="silder">
        <swiper :options="swiperOption" >
          <swiper-slide>
            <img src="http://business.cdn.qianqian.com/qianqian/pic/bos_client_1540351085b6c4e718aa521fc616df0429472b10f7.jpg" alt="">
          </swiper-slide>
          <swiper-slide >
            <img src="@/assets/banner/b2.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="@/assets/banner/b3.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="http://business.cdn.qianqian.com/qianqian/pic/bos_client_154038645548ca3213997492c4a66ec08d27b4aafd.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="http://business.cdn.qianqian.com/qianqian/pic/bos_client_153991807148d40eafaa4c6cdd21d464ac46373a1c.jpg" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="http://business.cdn.qianqian.com/qianqian/pic/bos_client_1551235627e88cf969cc9d50aeac62dd538480d354.jpg" alt="">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
</template>

<script>
export default {
  name: 'slider',
  data(){
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
        /*是否拖动切换*/
        loop: true,
        /*自动切换*/
        autoplay: {
          delay: 1200,//1秒切换一次
          disableOnInteraction: false,//用户操作后是否停止自动
        },
      }
    }
  }
}
</script>

<style scoped>
img{
  height: 180px;
  width: 100%;
}
.silder{
  width: 100%;
  margin-top: 44px;
}
.silder .swiper-slide{
  height: 180px;
}
.silder .swiper-pagination  .swiper-pagination-bullet-active {
  background-color: #ff0065;
}
</style>
