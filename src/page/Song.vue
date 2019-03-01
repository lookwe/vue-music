<template>
  <div class="collection-block">
    <div class="block-padding">
      <!--title-->
      <div class="title">
        <h3 >
          <span>热门歌单</span>
        </h3>
        <router-link tag="a" to="/top"  class="btn-more" >更多</router-link>
      </div>
    </div>
    <songList></songList>
  </div>
</template>

<script>
import songList from '../components/songSheet'
export default {
  name:'song',
  components:{
    songList
  }
}
</script>

<style scoped>
.title{
  margin-bottom: 0
}
</style>
