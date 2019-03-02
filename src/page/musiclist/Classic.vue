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
  name:'Classic',
  data(){
    return {
      billboard_type:'22'
    }
  },
  methods:{
    getmusic(obj){
      this.$emit('get_music',obj)
    }
  },
  components:{
    musicList
  },
}
</script>

<style scoped>

</style>
