<template>
  <div>
    <search-nva></search-nva>
    <div class="singer_nav">
      <div class="artists-header">
         <el-row class="nav-tab row">
           <el-col v-for="(item,index) in singerNav.type" :span="4" :key="index" >
             <div :class="{'grid-content':true,'select':item === type_checked}" @click="selectStatus(item,'type')"><span>{{item}}</span></div>
           </el-col>
         </el-row>
         <el-row class="nav-tab row" >
           <el-col v-for="(item,index) in singerNav.sex" :span="4" :key="index" >
             <div :class="['grid-content',{'select':item.value === sex_checked}]" @click="selectStatus(item,'sex')"><span>{{item.value}}</span></div>
           </el-col>
         </el-row>
     </div>
      <div class="abc-nav-tab row">
        <el-row>
          <el-col :span="12"><div class="bg-purple"><span> &nbsp;&nbsp;{{statusName}}</span></div></el-col>
          <el-col :span="12"><div class="bg-purple-right"  @click="showPopup"><i  class="el-icon-menu"></i></div></el-col>
        </el-row>
      </div>
        <!--显示歌手个UI lI 列表-->
        <singer-ul-list
          :singerData="singerData"
        ></singer-ul-list>

    </div>
    <my-footer></my-footer>
    <popup
      :popup="popup"
      @hidePopup="hidePopup"
    >
      <div class="popup-content">
        <h3>歌手首字母</h3>
        <div class="model-content">
          <el-row class="popup-list">
            <el-col
              v-for="(item,index) in Alphabet"
              :span="4"
              :key="index"
            >
              <div :class="['grid-content',{'select':Alphabet_checked === item}]" @click="selectStatus(item,'alphabet')"><span>{{item}}</span></div>
            </el-col>
          </el-row>
        </div>
        <div class="logout">取消</div>
      </div>
    </popup>
  </div>
</template>

<script>
import myfooter from '../../components/footer'
import singerUlList from  '../../components/singerUlList'
import search_nva from '../../components/search_nav'
import popup from '../../components/popup'
export default {
  name:'singerList',
  components:{
    'search-nva': search_nva,
    'my-footer': myfooter,
    'singer-ul-list':singerUlList,
    popup
  },
  data(){
    return{
      statusName:'热门',
      sex:0,
      popup:{
        isShowPopup:false,
        topUp:false,
        down:false,
        height:'360px'
      },
      type_checked:'全部',
      sex_checked:'全部',
      Alphabet_checked:'热门',
      singerNav:{
          type:['全部','华语','欧美','韩国','日本','其他'],
          sex:[
            {name:0,value:'全部'},
            {name:1,value:'男'},
            {name:2,value:'女'},
            {name:3,value:'组合'}
          ]
       },
      Alphabet:['热门','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','其他'],
      singerData: []
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

    selectStatus(content,type){
      if (type === 'type'){
          this.type_checked = content
      }else if(type === 'sex'){
          this.sex_checked = content.value
          this.sex = content.name
      }else {
          this.Alphabet_checked = content
      }
      this.statusName = this.Alphabet_checked + ' - '+ this.type_checked+' - '+this.sex_checked
     },

    baiDuGitData(limit,sex,abc,area2){
      let area = {
        '全部':0,
        '欧美':3,
        '其他':5,
        '华语':6,
        '韩国':7,
        '日本':60
      }[area2]
      this.singerData = []
      let url = this.musicapi + `/v1/restserver/ting?from=webapp_music&format=json&method=baidu.ting.artist.getList&offset=0&limit=${limit}&order=1&area=${area}&sex=${sex}&abc=${abc}`
      this.$axios.get(url).then(res => {
        this.singerData = res.data.artist.map((item) => {
          let params = {}
          params.tingUid = item.ting_uid
          params.avatarMiddle = item.avatar_middle
          params.name = item.name
          return params
        })
      }).catch(error => {
        console.log(error);
      })
    }
  },
  watch:{
    statusName(newName,alneme){
      this.baiDuGitData(20,this.sex,this.Alphabet_checked,this.type_checked)
    }
  },
  created(){
    this.baiDuGitData(20,0,'热门',0)
  }
}
</script>

<style scoped>
.singer_nav{
  width: 100%;
  height: auto;
  margin-top: 3.75rem;
  overflow: hidden;
  font-size: 1.6rem;
}
.row{
 width: 92%;
 margin: 0 auto;
}
/*顶部筛选*/
.artists-header{
  width: 100%;
  height: 100px;
  background-color: #FCFCFC;
}
.nav-tab{
  height: 50px;

}
.grid-content{
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.select span{
  color: #E03229;
  border-bottom: 1px solid #E03229;
}

/*筛选提示*/
.abc-nav-tab{
  overflow: hidden;
}
.abc-nav-tab div{
  margin-top: .3rem;
}
.abc-nav-tab .bg-purple{
  padding-left: .2rem;
}
.bg-purple-right i{
  float: right;
  color: #666;
  font-size: 1.9rem;
}

  /*模式窗口*/
.popup-content{
  width: 85%;
  margin: 0 auto;
  z-index: 9999;
  text-align: center;
}
.popup-content h3{
  height: 60px;
  margin: 0 10px;
  line-height: 60px;
  font-size: 1.6rem;
  font-weight: 400;
  border-bottom: 1px solid #eee;
}
.popup-content .model-content{
  width: 100%;
  height: auto;
 border-bottom: 1px solid #eee;
}
.popup-list{
  font-size: 1.6rem;
}
.logout{
  width: 100%;height: 40px;background-color: #E03229;color: #fff;font-size: 1.55rem;line-height: 40px;
}

</style>
