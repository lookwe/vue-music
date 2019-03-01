<template>
<div class="search-view view">
  <!--input查询box-->
  <div class="search-input-cmp">
      <div class="input-wrap">
        <i class="el-icon-search"></i>
        <input @keydown="onInputEnter" @click="isSelectHide=true" type="search" autocomplete="off" ref="input" autofocus="autofocus" placeholder="歌名、歌词、歌手、专辑" v-model="inputVal" >
        <span @click="searchInfo(isSearch)">{{textInfo}}</span>
      </div>

      <div v-if="isSelectHide">
        <div :class="{'is_hide':isSearch}" >
          <!--推荐 -->
          <div class="search-landing">
            <h3>热门搜索</h3>
            <ul class="today">
              <li v-for="(item,index) in today" :key="index" @click="handlerHistory(item)"><span>{{item}}</span></li>
            </ul>
          </div>
          <!-- 历史记录-->
          <div class="search-landing history">
            <ul class="history_list">
              <li  v-for="(item,index) in historyList" :key="index">
                <span @click="handlerHistory(item)" class="handler-name">{{item}}</span>
                <span @click="clearOneHistory(index)"  style="width:15%">
                  <i class="el-icon-circle-close"></i>
                </span>
              </li>
            </ul>
            <div class="no-result" v-if="historyList.length === 0">
              暂无历史记录
            </div>
            <div class="history-clear-btn" @click="clearAllHistory">
              <span><i class="el-icon-delete"></i> 清空历史记录</span>
            </div>
          </div>
        </div>

        <!--异步获取数据-->
        <div class="input—search" v-if="isSearch">
          <div class="search-landing search_content" v-if="isSearch">
            <h3>搜索：“ {{inputVal}} ”</h3>
          </div>
          <div class="input—search_list">
            <!--判断是否歌曲-->
            <ul v-if="searchData.artist.length <= 1" v-for="(item,index) in searchData.song" :key="index">
              <li>
                <!--判断歌曲中的第一行 第一行显示歌曲作者-->
                <router-link tag="p" :to="{name :'artist',params:{singer_id:item.artistid}}"  v-if="index===0 && searchData.artist.length > 0 " >
                  <span class="type">歌手</span>
                  <span class="content">{{item.artistname}}</span>
                </router-link>

                <router-link tag="p" :to="{name:'play',params:{song_id:item.songid}}" v-if="index > 0 || searchData.artist.length === 0 " >
                  <span class="type" >歌曲</span>
                  <span class="content" >{{item.songname}}</span>
                  <span class="type">-&nbsp;&nbsp;{{item.artistname}}</span>
                </router-link>

                <!--判断是否显示专辑-->
                <router-link tag="p" :to="{name:'play',params:{song_id:item.songid}}"  v-if="searchData.song.length <= 2  " >
                  <span class="type" >专辑</span>
                  <span class="content" >{{item.songname}}</span>
                  <span class="type">-&nbsp;&nbsp;{{item.artistname}}</span>
                </router-link>
              </li>
            </ul>

            <!--判断是否都是歌手 歌手多优先显示-->
            <ul v-if="searchData.artist.length > 1" v-for="(item,index) in searchData.artist" >
              <router-link tag="li" :to="{name :'artist',params:{singer_id:item.artistid}}" :key="index">
                <span class="type">歌手</span>
                <span class="content">{{item.artistname}}</span>
              </router-link>
            </ul>

          </div>
        </div>
      </div>
      <router-view v-if="!isSelectHide"></router-view>
  </div>


</div>
</template>

<script>
export default {
  name:'search',
  data(){
    return {
      inputVal: '',
      //接受服务器数据
      searchData:{artist:[], song:[]},
      isSearch:false,
      historyList:[],
      textInfo:'取消',
      isSelectHide:true,
      today:['黄钟飞','薛之谦','去流浪','8先生','卡路里','后来','买了佛冷','起风了','蔡徐坤','怀恋青春']
    }
  },
  methods:{
      //回车查询
      onInputEnter(obj){
        if(obj.keyCode === 13){
          this.handlerHistory(this.inputVal)
        }
      },

      addHistory(val){
        if (val.length > 0){
          if(this.historyList.length >= 7){
            this.historyList.splice(this.historyList.length-1,1)
          }
          //判断是否有相同的，有侧删除并退结束循环
          for (let i = 0;i<this.historyList.length;i++){
            if(val === this.historyList[i]){
              this.historyList.splice(i,1)
              break
            }
          }
          this.historyList.unshift(val)
          //将数组按条件拆分成字符串
          let array_str = this.historyList.join(',')
          localStorage.historyList = array_str;
        }
      },

      clearAllHistory(){
        localStorage.removeItem("historyList");
        this.loadHistory()
      },

      clearOneHistory(index){
        let array = localStorage.historyList.split(',')
        array.splice(index,1);
        if (array.length === 0){
          localStorage.removeItem("historyList");
        }else {
          localStorage.historyList = array.join(',')
        }
        this.loadHistory()
      },

      loadHistory(){
          if(localStorage.hasOwnProperty('historyList')){
            //讲字符串按条件拆分成数组
            this.historyList = localStorage.historyList.split(',')
          }else {
            this.historyList = []
          }
      },

      //查询按钮
      searchInfo(flg){
        if(!flg){
            this.$router.push({name:'index'})
            return false
        }
        let History = this.inputVal.trim()
        this.addHistory(History)

        this.handlerHistory(History)
      },

      //获取后台数据
      loadData(url){
        this.$axios.get(url)
          .then(res =>{
            if(res.data.error_code === 22000){
              this.searchData = res.data
               if(this.searchData.artist.length > 0){
                 this.searchData.song.unshift({
                   'artistname':this.searchData.artist[0].artistname,
                   'artistid':this.searchData.artist[0].artistid
                 })
                }
            }
          }).catch(error =>{
          console.log(error);
        })
      },

      //单击行 查询
      handlerHistory(value){
        this.inputVal = value
        this.isSelectHide = false
        this.addHistory(value.trim())
        this.$router.push({name: '/query', params: {query: this.nameFormat(value)}})
      },
      //搜索格式化
      nameFormat(value){
        let query = value.trim().replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?\(\)\!\！\￥\%\,\.\+]/g,'')
        return query
      },

  },
  watch:{
    inputVal(newVal,oldVal){
      sessionStorage.HistorySearchName = newVal
      if(newVal.length <= 0){
        this.textInfo = '取消'
        this.isSearch = false
      }else {
        this.textInfo = '搜索'
        this.isSearch = true

        setTimeout(()=>{
          let searchUrl = this.HOST + '/v2/restserver/ting?method=baidu.ting.search.catalogSug&query='+ this.nameFormat(newVal)
          this.loadData(searchUrl)
        },400)
      }
    }
  },
  mounted(){
      let str = sessionStorage.HistorySearchName
      if (str === undefined){
        str = ''
      }
      this.inputVal = ''+str
      //页面渲染时候给input获得光标
      this.$refs.input.focus();
  },
  created(){
    this.loadHistory();
  }
}
</script>

<style scoped>
  .is_hide{
    display: none;
  }
  .el-icon-circle-close{
    font-size: 18px;color: #ccc
  }
 .input-wrap .el-icon-search{
   font-size: 20px;padding-left: 10px
  }
  .search-view {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .search-input-cmp{
    background-color: #fff;
    padding-bottom: 10px;
    padding-top: 5px;
  }
  .search-input-cmp .input-wrap{
    margin: 0 auto;
    width: 95%;
    height: 36px;
    border-radius:60px;
    border: 1px solid #c3c3c3;
    display: flex;
    align-items:center;
  }
  .input-wrap .icon-fangdajing{
    display: inline-block;
    margin-left: 10px;
  }
  .input-wrap input {
    width: 76%;
    font-size: 16.5px;
    margin-left: 10px;
    color: rgba(0,0,0,.6);;
    border-right: 1px solid #c3c3c3;
  }
  .input-wrap span{
    padding-left: 7px;
    font-size: 14px;
    color: #333;
  }

  .search-landing{
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
  .search-landing h3{
    font-size: 14.5px;
    color: rgba(0,0,0,.6);
    margin-left: 20px;
  }
  .search-landing .today{
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }
  .search-landing .today li{
    width: auto;
    height: 3.6rem;
    border: 1px solid #E15C52;
    border-radius: .4rem;
    line-height: 3.4rem;
    float: left;
    margin-left: 10px;
    margin-top: 10px;

  }
  .search-landing .today li span{
    padding:0 5px;
    font-size: 15px;
    color: #E15C52;
  }
  .handler-name{
    width: 76.4%;padding-left: 6%
  }

  .history{
    border-top: 1px solid #eee;
  }
  .history .history_list li{
    width: 100%;
    height: 53px;
    line-height: 49px;
    border-bottom: 1px solid #eee;
    box-sizing:border-box;
  }
  .history .history_list li span{
    font-size: 15.5px;
    color: #333;
    display: inline-block;
  }
  .history .history_list li span i{
   padding-left: 40%;
  }

  .history .no-result{
    color: #999;
    padding: 12px 20px;
    font-size: 1.4rem;
    border-bottom: 1px solid #eee;
  }

  .history .history-clear-btn{
    width: 160px;
    height: 37px;
    background-color: #E13228;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    line-height: 37px;
  }
  .history-clear-btn .el-icon-delete{
    font-size: 1.5rem;
  }
  .history-clear-btn span{
    color: #fff;
    font-size: 16px;

  }

  .input—search{
    padding: 5px 0px;
  }
  .input—search .search_content{
    border-bottom: 1px solid #eee;
  }
  .input—search h3{
    color: #E15C52;
    padding-bottom: 10px;
  }
  .input—search .input—search_list{
    width: 100%;
    height: auto;
  }
  .input—search .input—search_list ul{
    width: 100%;
    height: 100%;
  }
  .input—search_list ul li{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 89%;
    padding: 0 20px;
    line-height: 43px;
    border-bottom: 1px solid #eee;
  }
  .input—search_list ul li span{
    padding-right: 15px;
  }
  .input—search_list ul li .type{
    color: #999;
    font-size: 1.3rem;
  }
  .input—search_list ul li .content{
    color: #333;
    font-size: 1.55rem;

  }

</style>
