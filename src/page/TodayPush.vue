<template>
  <div class="collection-block">
    <div class="block-padding">
      <div class="title" style="margin-bottom: 0;" >
        <h3 >
          <router-link tag="a" :to="{name:'songs',params:{billboard_type:'23'}}">智能推荐</router-link>
        </h3>
        <router-link tag="a" :to="{name:'songs',params:{billboard_type:'23'}}" class="btn-more">更多</router-link>
      </div>
    </div>
    <todayList :song_id="songId"></todayList>
  </div>
</template>

<script>
  import todayList from '../components/TodayList'
  export default {
    name:'TodayPush',
    data(){
      return {
        todayData:[],
        songId:'92'
      }
    },
    components:{
      todayList
    }

  }
</script>

<style scoped>
.collection-block{
  width: 100%;
 height: auto;
}

</style>
