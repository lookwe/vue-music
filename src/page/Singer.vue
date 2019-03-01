<template>
  <div class="collection-block">
    <div class="block-padding">
      <div class="title" style="margin-bottom: 0" >
        <h3 >
          <a href="/listcate">实力歌手</a>
        </h3>
        <router-link tag="a" to="/singer" class="btn-more">更多</router-link>
      </div>
    </div>
    <div class="row_wrapper">
      <div class="row_content">
        <singerlist :songTid="'1376'"></singerlist>
      </div>
    </div>
  </div>
</template>

<script>
   import singerlist from '../components/singerList'
    export default {
        name:'singer',
        components:{
          singerlist
        }
    }
</script>

<style scoped>
  .row_wrapper{
    width: 100%;
  }
  .row_wrapper .row_content{
    width: 95%;
    margin: 0 auto;
  }

</style>
