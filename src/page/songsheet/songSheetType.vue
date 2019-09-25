<template>
    <div>
      <!--nav功能选项-->
      <searchnva></searchnva>
      <div class="songs-header">
        <img width="100%" height="200px" v-lazy="imgUrl || defaultUrl"/>
      </div>

      <div class="list-box">
        <musicList
          :billboard_type="$route.params.billboard_type+''"
          :ranking="ranking"
          :size="size"
          @getImgSrc="getImgSrc"
        >
        </musicList>
      </div>
    </div>
</template>

<script>
import searchnva from '../../components/search_nav'
import musicList from '../../components/musicList'
export default {
  name:'songs',
  data(){
    return {
      size:'12',
      billboard:{},
      defaultUrl:require('@/assets/imgage/load.jpg'),
      imgUrl:'',
      ranking:false
    }
  },
  components:{
    searchnva,
    musicList,
  },
  methods:{
    //接受子组件数据 把子组件的图片传地址传来
    getImgSrc(val) {
      this.imgUrl = val;
    },
  },
}
</script>

<style >
  .collection-block{
    background-color: #f8f8f8;
    padding-bottom: 10px;
  }
  .block-padding{
    padding: 10px 17px;
    background-color: #fff;
  }
  .list-box{
    padding: 0 15px;background-color: #fff
  }
.songs-header {
  margin-top:45px;
  height: 200px;
  background-color: #fff;

}

</style>
