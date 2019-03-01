<template>
  <div class="row_wrapper">
    <div class="row_content">
      <el-row>
        <el-col  :span="8">
          <div class="col_content">
            <div class="song-img">
              <img v-lazy="imgList[0] || defaultUrl" width="100%"/>
              <span>木吉他合唱团，台湾校园民谣精选</span>
            </div>
          </div>
        </el-col>

        <el-col  :span="8">
          <div class="col_content">
            <div class="song-img">
              <img v-lazy="imgList[1] || defaultUrl" width="100%"/>
              <span>你的微笑像魔法，治愈世间烦恼</span>
            </div>
          </div>
        </el-col>

        <el-col  :span="8">
          <div class="col_content">
            <div class="song-img">
              <img v-lazy="imgList[2] ||defaultUrl" />
              <span>让耳朵沦陷的极致英文歌</span>
            </div>
          </div>
        </el-col>

        <el-col  :span="8">
          <div class="col_content">
            <div class="song-img">
              <img v-lazy="imgList[3] || defaultUrl"/>
              <span>听影视剧 唱出自己的故事</span>
            </div>
          </div>
        </el-col>

        <el-col  :span="8">
          <div class="col_content">
            <div class="song-img">
              <img v-lazy="imgList[4] || defaultUrl"/>
              <span>旧城等旧梦 空阙守空约</span>
            </div>
          </div>
        </el-col>

        <el-col  :span="8">
          <div class="col_content">
            <div class="song-img">
              <img v-lazy="imgList[5] || defaultUrl"/>
              <span>【怀旧】那些我们儿时都会唱的歌</span>
          </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name:'songList',
    data(){
      return{
        imgList:[
          'http://musicugc.qianqian.com/ugcdiy/pic/bf9bb97eba0b41a99e1f0331a904c28e.jpg',
          'http://musicugc.qianqian.com/ugcdiy/pic/df363066e1bcc993cbf361192016703d.jpg',
          'http://musicugc.qianqian.com/ugcdiy/pic/2b504727b7fb0d3f5115a86578541c08.jpg',
          'http://musicugc.qianqian.com/ugcdiy/pic/14ccc27d332c2bdccc5693b67f1fbefd.jpg',
          'http://musicugc.qianqian.com/ugcdiy/pic/e8ba994133396c75089d2d7e71b0f7b5.jpg',
          'http://musicugc.qianqian.com/ugcdiy/pic/1d82265a0072e6632a92b80186bbd249.jpg',
        ],
        defaultUrl:require('@/assets/imgage/load.jpg'),
      }
    }
  }
</script>

<style scoped>
.song-img{
  width: 100%;

}
.song-img span{
  display: inline-block;
  width: 100%;
  height: 3.5rem;
  margin-top: .4rem;
  overflow: hidden;
  color: #444;
}
</style>
