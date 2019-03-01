import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import Hot from '../page/musiclist/Hot'
import New from '../page/musiclist/New'
import Classic from '../page/musiclist/Classic'
import  play from '@/page/play/MusicPlay'


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass :'linkActive',
  routes: [
    {
      path: '/',
      name: 'init',
      component:()=>import('@/App.vue'),
      redirect:'/index',
      children:[
        {
          path: '/index',
          name: 'index',
          component: index,
          redirect:'/Hot',
          children:[
            {
              path: '/Hot',
              name: 'Hot',
              component: Hot
            }, {
              path: '/New',
              name: 'New',
              component: New
            }, {
              path: '/Classic',
              name: 'Classic',
              component: Classic
            },
          ]
        },
        //歌手信息
        {
          path: '/artist/:singer_id',
          name: 'artist',
          component:()=> import('@/page/singer/singer_info')
        },
        //歌曲播放
        {
          path: '/play/:song_id',
          name: 'play',
          component:play
        },
        //歌曲播放:多参数
        {
          path: '/play/:song_id/:currentTime',
          name: 'playMany',
          component:play
        },
        //歌曲..歌手...查询
        {
          path:'/search',
          name:'search',
          component:()=> import('@/page/search/search'),
          children:[
            {
              path:'/search/:query',
              name:'/query',
              component:()=> import('@/components/searchList')
            }
          ]
        },
        //歌单类型类别 比如：新歌 经典 流行 伤感
        {
          path:'/songs/:billboard_type',
          name:'songs',
          component:()=> import('@/page/songsheet/songSheetType'),
        },
        {
          path:'/user',
          name:'user',
          component:()=> import('@/page/user/user')
        },
        {
          path:'/top',
          name:'songSheet',
          component:()=> import('@/page/songsheet/songsheet')
        },
        {
          path:'/singer',
          name:'singerList',
          component:()=> import('@/page/singer/singerList')
        },
        {
          path:'/songlists',
          name:'songLists',
          component:()=> import('@/page/songsheet/songlists')
        },
        {
          path:'/album/:album_id',
          name:'album',
          component:()=> import('@/page/album/index')
        }
      ]
    },
    {
      path:'/logn',
      name:'logn',
      component:()=> import('@/page/logn')
    },
    {
      path:'/register',
        name:'register',
      component:()=> import('@/page/user/register')
    },


  ]
})
