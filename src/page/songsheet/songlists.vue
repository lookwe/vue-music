<template>
<div>
  <search-nva></search-nva>
  <div class="song_list">
    <div class="block-padding">
        <div class="title">
          <h3 >
            <span>热门分类</span>
          </h3>
        </div>
        <div class="song_nav_box">
          <table border="1">
            <tr>
              <td rowspan="2">流行</td>
              <td>民谣</td>
              <td style="background-color: #EFEBEB">网络歌曲</td>
            </tr>
            <tr>
              <td style="background-color: #EFEBEB">摇滚</td>
              <td>DJ</td>
            </tr>
          </table>
        </div>
      </div>
    <div class="block-padding bt">
      <div class="title">
        <h3>
          <span>{{on}} </span>
          <i class="el-icon-caret-bottom" @click="showPopup"></i>
        </h3>

        <div class=" tag-box">
          <div :class="{'bottom-select':checked==='new'}" @click="checked='new'">最新</div>
          <div :class="{'bottom-select':checked==='hot'}" @click="checked='hot'">最热</div>
        </div>
      </div>
    </div>
    <div class="album-list">
      <div class="song-list-items">
        <el-row>
          <el-col :span="12" v-for="(item,index) in songItems" :key="index">
            <div class="song-item">
                <div class="image-wrapper">
                  <img  v-lazy="item.imgSrc">
                  <div  class="play-num">
                    <i  class="el-icon-service"></i>&nbsp; {{item.Playback}}万
                  </div>
                </div>
                <div>
                  <div class="tag">{{item.tag}}</div>
                  <div class="title">{{item.title}}</div>
                </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <my-footer></my-footer>

  <popup
    :popup="popup"
    @hidePopup="hidePopup"
  >
    <div class="all_nav">
        <div class="select_tag">
           选中分类标签
        </div>
        <div class="popup-content">
          <div class="popup-head">
            <p :class="{'on':on=='全部'}" @click="on='全部'">全部</p>
            <div v-for="(item,index) in typeNav" :key="index">
              <h3 class="tag-title">{{item.name}} ({{item.list.length}})</h3>
              <el-row >
                <el-col :span="8" v-for="(son,index) in item.list" :key="index">
                  <div @click="selectOne(son)" :class="['tag-one',{'on':son==on}]">
                    {{son}}
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="logout">
          关闭
        </div>
    </div>
  </popup>

</div>
</template>

<script>
import myfooter from '../../components/footer'
import search_nva from '../../components/search_nav'
import popup from '../../components/popup'
export default {
  name:'songlists',
  data(){
    return {
      checked:'new',
      on:'全部',
      songItems:[
        {
          imgSrc:'http://musicugc.qianqian.com/ugcdiy/pic/41d0dea9a7a988af7b9dae9f0bbf8c07.jpg',
          Playback:'22.9',
          tag:'华语 · 校园 · 思念',
          title:' 听完这首歌，带你回到18岁',
          album_id:'518119881',
        },
        {
          imgSrc:'http://musicugc.cdn.qianqian.com/ugcdiy/pic/18ae11f5ee43f821fbe137b2f8419a41.jpg@w_300,h_300,o_1',
          Playback:'32.2',
          tag:'华语 · 校园 · 寂寞',
          title:'毕业季：转眼就要各奔东西',
        },
        {
          imgSrc:'http://hiphotos.qianqian.com/ting/pic/item/b2de9c82d158ccbf7d2d11791ed8bc3eb03541db.jpg',
          Playback:'26.5',
          tag:'流行 · 电子 · 兴奋',
          title:'怀念曾经穿校服的年少轻狂',
        },
        {
          imgSrc:'http://hiphotos.qianqian.com/ting/pic/item/b999a9014c086e06fd4f379100087bf40bd1cb01.jpg',
          Playback:'21.8',
          tag:'华语 · 运动 · 流行',
          title:'跑步时必听神曲',
        },
        {
          imgSrc:'http://musicugc.cdn.qianqian.com/ugcdiy/pic/a130cf33522e502895f503c3354c8c98.jpg@w_300,h_300,o_1',
          Playback:'11.2',
          tag:'华语 · 影视原声 · ACG',
          title:'动画影视的主题曲真的很好听',
        },
        {
          imgSrc:'http://musicugc.cdn.qianqian.com/ugcdiy/pic/0998e8dea0bc37a10d31d76144d8a51b.jpg@w_300,h_300,o_1',
          Playback:'23.5',
          tag:'流行 · 华语 · 旅行',
          title:'旅行伴侣|音乐与你一路随行',
        },

        {
          imgSrc:'http://musicugc.qianqian.com/ugcdiy/pic/87bea95e05d669c95acf12530b67aebd.jpg',
          Playback:'25.7',
          tag:'欧美 · 流行 · 美好',
          title:'适合循环播放，百听不厌的英文歌',
        },
        {
          imgSrc:'http://musicugc.cdn.qianqian.com/ugcdiy/pic/e5c90a8f58ac9b97c69cb66dba9862d5.jpg@w_300,h_300,o_1',
          Playback:'35.3',
          tag:'华语 · 粤语 · 流行',
          title:'是否风雨带走了你的爱情',
        },
        {
          imgSrc:'http://musicugc.cdn.qianqian.com/ugcdiy/pic/ea865aa7f7857d02feac3a10dc806ddc.jpg@w_300,h_300,o_1',
          Playback:'24.3',
          tag:'清新 · 韩语 · 流行',
          title:'每首都有中毒旋律的韩语歌曲',
        },
        {
          imgSrc:'http://musicugc.cdn.qianqian.com/ugcdiy/pic/527cc590d584ac444cfc30c2f5479655.jpg@w_300,h_300,o_1',
          Playback:'33.1',
          tag:'华语 · 励志 · 流行',
          title:'永远年轻，永远热泪盈眶',
        }

      ],
      popup:{
        isShowPopup:false,
        topUp:false,
        down:false,
        height:'370px'
      },
      typeNav:{
        ping:{
          name:'语种',
           list:['英语','华语','日语','韩语','粤语']
        },
        style:{
          name:'风格',
          list:['流行','民族','电子','摇滚','DJ','古典','说唱']
        },
        feeling:{
          name:'感情',
          list:['快乐','美好','安静','伤感','寂寞','思念','孤独','怀旧','悲伤','感动','治愈','放松',
             '清新','浪漫','兴奋','性感','励志'
          ]
        },
        scene:{
          name:'场景',
          list:['运动','驾驶','学习','工作','清晨','夜晚','午后','游戏','酒吧','旅游','散步','夜店',
            '咖啡厅','地铁','校园','婚礼','约会','休息','登山'
          ]
        },
        theme:{
          name:'主题',
          list:['经典','翻唱','榜单','现场','KTV','DJ','网络歌曲','器乐']
        },
      },
      SingerList:{},
    }
  },
  methods:{
    showPopup(){
      this.popup.isShowPopup = true
      this.popup.down = false
      setTimeout(()=>{
        this.popup.topUp = true
      },150)
    },

    hidePopup(){
      this.popup.isShowPopup = false
    },

    selectOne(val){
      this.on = val
    }

  },
  components:{
    'search-nva': search_nva,
    'my-footer': myfooter,
    popup
  }
}
</script>

<style scoped>
.album-list{
  width: 100%;background-color: #fff;height: auto;overflow: hidden;
}
.bt{
  margin-top: 1rem
}
.song_list{
  width: 100%;
  margin-top: 3.75rem;
  overflow: hidden;
}
.title{
  margin-bottom: 0
}
.song_nav_box{
  height: 90px;
  width:100%;
  margin: 0 auto;
  margin-top: .5rem;
}
.song_nav_box table{
  width:100%;
  height: 100%;
  border: 1px solid #fff;
}
.song_nav_box table tr td{
  width: 33%;
  text-align: center;
  background-color: #F6F1F1;
  color: #E03229;
  font-size: 1.45rem;
}

.tag-box{
  width: 24%;
  height: 24px;
  display: flex;
  border: 1px solid #ccc;
  border-radius:.1rem;

}
.tag-box div{
  width: 50%;
  line-height: 24px;
  text-align: center;
  display: inline-block;
}
.bottom-select{
  background-color: #ccc;
}

.song-list-items{
  background-color: #fff;
  width: 96%;
  height: auto;
  margin:  0 auto;
  margin-top: 1.5rem;
}
.song-item{
  width: 95%;
}
.image-wrapper{
  width: 100%;
  position: relative;
}

.image-wrapper .play-num{
  background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(rgba(0,0,0,.8)));
  background: -webkit-linear-gradient(top,transparent,rgba(0,0,0,.8));
  background: linear-gradient(180deg,transparent 0,rgba(0,0,0,.8));
  width: 95.4%;
  height: 29px;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  padding-left: 7px;
  padding-top: 6px;
  line-height: 33px;
  font-size: 1.2rem;
}
.image-wrapper .play-num i{
  font-size: 1.5rem;
}
.tag{
    color: #ccc;
    margin-top: .3rem;
  }
.song-item .title{
    font-size: 1.4rem;
    height: 40px;
    margin-bottom: 20px;
    overflow: hidden;
  }

.all_nav{
  width:100%;
}
.select_tag{
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #f2f2f2;
  font-size: 1.65rem;
}
.popup-content{
  width: 90%;
  height: 275px;
  margin: 0 auto;
  z-index: 9999;
  overflow-x: hidden;
}
.popup-content .popup-head{
  width:100%;height: 720px;
}
.popup-content p{
  color: #333;
  line-height: 33px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  text-align: center;
  font-size: 1.3rem;
}
.popup-content .on{
  background-color: #E03229;
  color: #fff;
  font-size: 1.55rem;
}
.tag-title{
  font-size: 13px;
  height: 35px;
  line-height: 35px;
}
.tag-one{
  width: 90%;
  height: 35px;
  border-radius: 4px;
  text-align: center;
  line-height: 36px;
  margin: 5px 0;
  border: 1px solid #eee;
  font-size: 1.4rem;
}
.logout{
  width: 90%;height: 33px;background-color: #E03229;color: #fff;font-size: 1.55rem;line-height: 33px;margin: 0 auto;border-radius: 4px;text-align: center;
  margin-top: 5px;
}

</style>
