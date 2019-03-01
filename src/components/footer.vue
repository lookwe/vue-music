<template>
  <div class="footer">
    <div class="content">
      <router-link tag="span" to="/Hot" class="return">返回首页</router-link>
      <span>意见反馈</span>
    </div>
    <div class="bj_img">
      <img src="@/assets/banner/footer-taihe.png" >
    </div>
    <div class="copyright">
      <span>
        © 2019-2029 feifei.ink 版权所有 ICP证：粤ICP备19018026号
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myfooter',
  }
</script>

<style >
.footer {
  width: 95%;
  height: 170px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 1px 1px 8px -2px #3C3F41;
}
.return{
  border-right: 1px solid #cacaca;
}
.footer .content {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.footer .content span {
  display: inline-block;
  width: 50%;
  font-size: 15px;
  color: #666;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.footer .bj_img{
   text-align: center;
}
.footer .bj_img img{
  position: relative;
  top: 1px;
  display: inline-block;
  height: 20px;
}
  .copyright{
    width: 100%;
    height: auto;
    margin-top: 30px;
    text-align: center;
    color: #ccc;
  }

</style>
