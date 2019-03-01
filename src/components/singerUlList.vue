<template>
  <div class="sing_list row">
    <el-row>
      <el-col :span="24" v-for="(item,index) in singerData" :key="index">
        <div class="sing_content" @click="singerDetails(item.tingUid)">
          <div class="pic" >
            <img v-lazy="item.avatarMiddle">
          </div>
          <div class="info">{{item.name}}</div>
          <i :class="[heartType]"></i>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  inject:['reload'],
  name:'singerUlList',
  methods:{
    singerDetails(singerId){
      this.$router.push({name:'artist',params:{singer_id:singerId+''}});
      this.reload();
    },
  },
  props:{
    singerData:{
      type:Array,
      default:function(){
        return [
              {
                tingUid:'2517',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/pic/140d09665d1c204efe00973c3e16282c/579342600/579342600.jpg@s_0,w_120',
                name:'薛之谦'
              },
              {
                tingUid:'1025',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/pic/246707754/246707754.jpg@s_0,w_120',
                name:'李宇春'
              },
              {
                tingUid:'1052',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/pic/246708025/246708025.jpg@s_0,w_120',
                name:'林俊杰'
              },
              {
                tingUid:'1045',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/pic/53ffdcb73270ba9d7a6bffc017ed82b4/583715635/583715635.jpg@s_0,w_120',
                name:'魏晨'
              },
              {
                tingUid:'2045',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/music/3F1ED9A6782C7DF67A980AA590C8E48C/252072527/252072527.jpg@s_0,w_120',
                name:'张卫健'
              },
              {
                tingUid:'2055',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/music/8CF033961D9C9B6D8F9B48AB3BAC69D1/252072674/252072674.jpg@s_0,w_120',
                name:'李冰冰'
              },
              {
                tingUid:'2017',
                avatarMiddle:'http://qukufile2.qianqian.com/data2/music/23D863A5B8A22C34FE2CDC3B6A4F1B5D/252331612/252331612.jpg@s_0,w_120',
                name:'萧淑慎'
              }
            ]
      }
    },
    heartType:{
      type:String,
      default:'el-icon-star-off'
    }
  }
}
</script>

<style scoped>
  .sing_list{
    height: auto;
  }
  .sing_content{
    height: 7rem;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    position: relative;
  }
  .sing_content i{
    position: absolute;
    top: 33%;
    right: 0;
    color: #777;
    font-size: 2.1rem;
  }
  .sing_content div img{
    border-radius: 27px;
    width: 100%;
  }
  .sing_content .pic{
    width: 54px;
    height: 54px;
    margin-right: 15px;
    border-radius: 27px;
  }
  .sing_content .info{
    width: 74%;
    font-size: 1.6rem;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sing_content  .color-red{
    color: #F54545
  }
</style>
