<template>
  <transition name="fade">
    <div class="th-popup" v-show="this.popup.isShowPopup" @click="hidePopup">
      <div :class="{'popup-no-header':true,'popup-up':this.popup.topUp,'popup-down':this.popup.down}" :style="{height: popup.height,bottom: '-'+popup.height}">
          <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
      name:'popup',
      methods: {
        hidePopup(){
          this.popup.down = true;
          this.popup.topUp = false;
          setTimeout(() => {
              this.popup.isShowPopup = false
          }, 150)
        }
      },
      props:{
        popup:{
          type:Object
        }
      }
    }
</script>

<style scoped>
  .th-popup{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    top: 0;
    height: 100%;
    background-color: rgba(0,0,0,.6);
    visibility: visible;
  }
  .popup-no-header{
    width: 100%;
    position: fixed;
    left: 0;
    z-index: 9999;
    background-color: #fafafa;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .th-popup .popup-up{
    bottom: 0!important;
    transition-duration: .3s;
  }
  .popup-down{
    bottom: -360px;
    transition-duration: .3s;
  }
</style>
