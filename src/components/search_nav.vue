<template>
  <div class="Music-head-nav">
    <router-link tag="a" to="/hot" class="nav-left">
      <span class="merge-logo"></span>
    </router-link>
    <div class="nav-right">
        <router-link tag="span" to="/songlists"  class="nva-item-content">分类</router-link>
        <router-link tag="span" to="/singer"  class="nva-item-content">歌手</router-link>
        <router-link tag="span" to="/search"  class="nva-item-content">搜索</router-link>
        <router-link tag="span" to="/top"  class="nva-item-content">榜单</router-link>
        <router-link tag="span" to="/user"  class="nva-item-content">我的</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name:'search_nav',
}
</script>

<style scoped>
  .nav-right  .linkActive {
    color: #E15C52;
    border-bottom: 2px solid #E15C52;
  }
</style>
