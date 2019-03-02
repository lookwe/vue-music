<template>
  <musicList
    :billboard_type="billboard_type"
    :isPullUp="false"
    :showImp="false"
    @get_music="getmusic"
  ></musicList>
</template>

<script>
import musicList from '@/components/musicList'
export default {
  name:'Hot',
  data(){
    return {
      billboard_type:'2'
    }
  },
  methods:{
    getmusic(obj){
      this.$emit('get_music',obj)
    }
  },
  components:{
    musicList
  }
}
</script>

<style scoped>

</style>
