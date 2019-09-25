<template>
  <div>
    <searchNav></searchNav>
    <div class="singer_info">
      <div class="singer_backg_img">
        <img class="backg_img" :src="singer.avatar_big"/>
        <div class="header-mask"></div>
        <div class="header-content">
          <div class="pic">
            <img :src="singer.avatar_middle"/>
          </div>
          <h2>{{singer.name}}</h2>
          <el-popover
            popper-class="popper_reference"
            placement="top-end"
            trigger="manual"
            :content="content"
            v-model="visible">
            <div slot="reference" class="care" @click="handlerCare" v-if="singer.name">
              <i :class="['like',icon]"></i>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="singer_nav">
      <ul>
        <li :class="{'th-tabbar-item':true,'selected':selected==0}" @click="handleSwitch(0)">热门歌曲</li>
        <li :class="{'th-tabbar-item':true,'selected':selected==1}" @click="handleSwitch(1)">专辑</li>
        <li :class="{'th-tabbar-item':true,'selected':selected==2}" @click="handleSwitch(2)">类似歌手</li>
      </ul>
    </div>
    <div class="singer_block-padding">
      <div style="width: 90%;margin: 0 auto">
        <keep-alive>
          <component v-bind:is="currentTabComponent"
                     :size="size"
                     :singerId="singer_id"
                     :showImp="true"
          >
          </component>
        </keep-alive>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
  import searchNav from '@/components/search_nav'
  import singerUlList from '@/components/singerUlList'
  import musicList from '@/components/musicList'
  import albumList from '@/components/albumList'
  import myfooter from '../../components/footer'
  import ref from '@/app/wilddog'

  export default {
    name: 'singer_info',
    data() {
      return {
        singer_id: '',
        size: '12',
        singer: {},
        icon: 'el-icon-star-off',
        visible: false,
        content: '成功关注',
        selected: 0,
        currentTabComponent: musicList,
        handlerList: [],
      }
    },
    methods: {
      handler() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        setTimeout(() => {
          loading.close();
        }, 300)
      },
      handleSwitch(index) {
        this.selected = index
        this.currentTabComponent = [musicList, albumList, singerUlList][index]
      },

      handlerCare(event) {
        event.stopPropagation()
        let user = sessionStorage.user
        if (user === undefined) {
          this.$message({
            dangerouslyUseHTMLString: true,
            center: true,
            showClose: true,
            duration: '2000',
            message: '<span>没登录?</span> <a style="color:#2177C7;font-size: 1.5rem;" onclick="bye()" href="http://feifei.ink/#/login">去登陆吧(´･･)ﾉ(._.`)</a>'
          });
        } else {
          this.visible = !this.visible
          if (this.icon === 'el-icon-star-off') {
            let params = {
              tingUid: this.singer['ting_uid'],
              avatarMiddle: this.singer['avatar_middle'],
              name: this.singer['name'],
            }
            this.handlerList.unshift(params)
            let newArr = this.handlerList.filter(item => {
              return item != undefined
            })
            ref.child(user + '/singers').set(newArr,
              error => {
                if (error === null) {
                  this.content = '成功关注'
                  this.icon = 'el-icon-star-on'
                }
              })
          } else {
            let newArr = this.handlerList.filter(item => {
              return item['tingUid'] != this.singer.ting_uid
            })
            ref.child(user + '/singers').set(newArr,
              error => {
                if (error === null) {
                  this.content = '取消关注'
                  this.icon = 'el-icon-star-off'
                }
              })
          }
          setTimeout(() => {
            this.visible = !this.visible
          }, 800)
        }
      },
    },
    components: {
      searchNav,
      musicList,
      'singer-ul-list': singerUlList,
      'my-footer': myfooter,
    },
    created() {
      let SongUrl = this.HOST + "/v2/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=" + this.$route.params.singer_id;
      this.$axios.get(SongUrl)
        .then(res => {
          this.singer = res.data
        }).catch(error => {
        console.warn(error);
      })

      /*判断是否关注 及获得关注列表*/
      this.singer_id = this.$route.params.singer_id;
      let user = sessionStorage.user
      if (user !== undefined) {
        ref.child(user + '/singers').once('value').then(res => {
          this.handlerList = [...res.val() || []]
          let att = this.handlerList.every((item) => {
            return item['tingUid'] != this.singer_id;
          })
          this.icon = att ? 'el-icon-star-off' : 'el-icon-star-on'
        })
      }
    }
  }
</script>
<style>
  .el-popover {
    z-index: 2005;
    position: absolute;
    top: 118px;
    left: 70% !important;
    min-width: 50px !important;
    background: rgba(1, 1, 2, 0.5);
    color: #fff;
    border: none;
  }

  .el-popover .popper__arrow {
    border-top-color: rgba(1, 1, 2, 0.5) !important;
  }

  .el-popover .popper__arrow::after {
    border-top-color: rgba(1, 1, 2, 0.5) !important;
  }
</style>

<style scoped>
  .singer_info {
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    margin-top: 44px;
  }

  .singer_info .singer_backg_img {
    width: 100%;
    height: 200px;
  }

  .singer_info .singer_backg_img .backg_img {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(6px);
    transform: scale(1.5);
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .singer_info .singer_backg_img .header-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsla(0, 0%, 65%, .45);
    overflow: hidden;
  }

  .singer_info .singer_backg_img .header-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
  }

  .header-content .like {
    float: left;
    color: #BE131D;
    font-size: 27px
  }

  .singer_backg_img .header-content .pic {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
  }

  .header-content .pic img[lazy=error], img[lazy=loading] {
    padding-top: 20px;
  }

  .singer_backg_img .header-content h2 {
    width: 60%;
    margin: auto;
    text-align: center;
    font-size: 1.8rem;
    margin-top: 10px;
    color: #333;
    font-weight: 400;
  }

  .singer_backg_img .header-content .care {
    position: absolute;
    bottom: 65px;
    right: 16px;
    width: 37px;
    height: 22px;
    text-align: right;
  }

  /*歌曲*/
  .singer_block-padding {
    width: 100%;
    margin-top: -30px;
    height: auto;
    padding: 10px 0px;
    background-color: #fff;
  }


</style>
