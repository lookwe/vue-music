<template>
  <div>

     <router-link
       tag="div"
       :to="{name :'artist',params:{singer_id:searchData.artist[0].ting_uid || '2517'}}"
       class="album"
       v-if="searchData.artist[0].author!==undefined" >
         <img width="100%" :src="searchData.artist[0].avatar_middle" />
         <div class="album_info">
             <p class="album_name">歌手: <span v-html="searchData.artist[0].author"></span></p>
             <p class="name txt">专辑数：{{searchData.artist[0].album_num}} 张&nbsp;&nbsp;&nbsp;歌曲数：{{searchData.artist[0].song_num}} 首</p>
         </div>
     </router-link>

     <div class="album" v-if="searchData.album[0].album_id !== undefined" @click="toAlbum(searchData.album[0].album_id)">
        <img  :src="searchData.album[0].pic_small" />
        <div class="album_info">
          <p class="album_name">专辑：<span v-html="searchData.album[0].title"></span></p>
          <p class="name txt">发行期：{{searchData.album[0].publishtime}} &nbsp;&nbsp;&nbsp;作者：<span v-html="searchData.album[0].author"></span></p>
        </div>
     </div>


     <div class="song_list">
       <ul class="th-songlist" v-for="(item,index) in searchData.song" :key="index" >
         <router-link tag="li" :to="{name:'play',params:{song_id:item.song_id}}" :key="index">
           <div class="content">
             <div class="song_name album_name">
               <span>{{item.title}} </span>&nbsp;
               <img  src='http://i2.bvimg.com/677841/889e31e7d08f06d7t.jpg' width="14px"/>
             </div>
             <div class="txt">
               {{item.author}}
             </div>
           </div>
           <div class="icon_box">
             <i class="el-icon-download"></i>
           </div>
         </router-link>
       </ul>
       <ul class="th-songlist" v-if="!searchData.song">
         <li><span>赞无数据</span></li>
       </ul>
     </div>
  </div>
</template>

<script>
    export default {
        name:'searchList',
        data(){
          return {
            searchData:{
                song:[],
              artist:[{author:undefined}],
              album:[{album_id:undefined}],
            },
            ting_uid:'2517'
          }
        },
        methods:{
           toAlbum(album_id){
             this.$router.push({name:'album',params:{album_id}})
           },
        },
        created(){
          let url = this.musicapi + `/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.search.merge&query=${this.$route.params.query}&page_size=20&page_no=0&type=0,1,2,5,7`
          this.$axios.get(url)
            .then(res =>{
              if(res.data.error_code === 22000){
                if(res.data.result.album_info.total > 0 ){
                  this.searchData.album = res.data.result.album_info.album_list
                }
                if (res.data.result.artist_info.total > 0){
                  this.searchData.artist = res.data.result.artist_info.artist_list
                }
                if(res.data.result.song_info.total > 0){
                  this.searchData.song = res.data.result.song_info.song_list
                }
              }
            }).catch(error =>{
            console.warn(error);
          })
        }
    }
</script>

<style scoped>
  .album{
    padding: 10px;
    display: flex;
    width: 87%;
    margin: 0 auto;
    border-bottom: 1px solid #eee;
  }
  .album img{
    width: 54px;
    height: 54px;
  }
  .album img[lazy=error] {
    width: 100px;
    height: 50px;
    margin-left: -30px;
  }
  .album img[lazy=error] + .album_info{
    height: 54px;
    margin-left: -5px;
    width: 70%;
  }
.song_list{
  margin-top: .5rem
}
.txt{
  padding: 5px 0px
}
  .album_info{
    height: 54px;
    margin-left: 20px;
    width: 70%;

  }
  .album_info p{
    display:block;
    height: 28px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

  }

  .album_name {
    font-size: 16px;
  }

  .album_name > span{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .txt{
    font-size: 10.2px;
    color: #999;
  }



  /*list歌曲*/

  .th-songlist{
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
  }
  .th-songlist li{
    padding: 5px 0px;
    width: 92%;
    margin:  0 auto;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content:center;
  }
  .th-songlist li .content{
    width: 85%;
  }
  .th-songlist li .content .song_name{
    display: flex;
    align-items:center;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .th-songlist li .icon_box{
    width: 15%;
    line-height: 43px;
    margin-top: .2rem
  }
  .icon_box .el-icon-download{
    font-size: 2.1rem;float: right;color: #ccc
  }


</style>
