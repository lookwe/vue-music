<template>
<div>
  <search-nva></search-nva>
  <div class="content">
    <ul class="all_top">
      <li class="sub_top" @click="songSheetType(items.type)" v-for="(items,index) in content" :key="index">
        <div class="song_img">
          <img v-lazy="items.pic_s192 || 'error'">
          <span></span>
        </div>
        <ul class="song_top">
          <li v-for="(item,index) in items.content">
            <span class="col-rank">{{index + 1}}</span>
            <span class="col-title">{{item.title}} - {{item.author}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <my-footer></my-footer>
</div>
</template>

<script>
import myfooter from '../../components/footer'
import search_nva from '../../components/search_nav'
export default {
  name:'songSheet',
  data(){
    return {
      content:[]
    }
  },
  components:{
    'search-nva': search_nva,
    'my-footer': myfooter
  },
  methods:{
    songSheetType(type){
      this.$router.push({name:'songs',params:{'billboard_type':type}})
    },

    loadData(){
      let url = this.musicapi + '/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.billboard.billCategory&kflag=0'
      this.$axios.get(url).then(res => {
        this.content = res.data.content
      }).catch(error =>{
        console.log(error);
      })
    }
  },
  mounted(){
    this.loadData()
  }
}
</script>

<style scoped>
.content{
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 3.7rem;
  overflow: hidden;
}
.content .all_top{
  width: 92%;
  height: 100%;
  margin: 0 auto;
}
.content .all_top .sub_top{
  width: 100%;
  height: 12rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items:center;
}
.content .all_top .sub_top .song_img{
  width: 8rem;
  height: 8rem;
  position: relative;
}
.content .all_top .sub_top .song_img span{
  position: absolute;
  bottom: .5rem;
  right: .5rem;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  width: 2.8rem;
  height: 2.8rem;
  background-image: url(//static1.qianqian.com/web/st/images/icon-play.87316085022d4965.png);
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 100%;
}

.song_img+.song_top{
  display: inline-block;
  width: 70%;
  height: 8rem;
  margin-left: 1rem;
  margin-top: .4rem;
}
.song_top li{
  line-height:2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.song_top .col-rank{
  color: #fa6644;
  font-family: Arial;
  font-weight: 700;
  font-style: italic;
}
.col-title{
  color: #343434;
  width: 10rem;
  margin-left: 1rem;
}
.song_top li span{
   font-size: 1.7rem;

}

</style>
