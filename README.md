### 飞飞音乐网（WebApp）

> 为了打代码能快地飞起还能听歌。所以利用了工作之余的时间由我个人独立开发。使用H5音频元素开发出了此webApp名为飞飞音乐

[观看网站](http://feifei.ink)
---

#### 技术栈
* Vue2.5&nbsp;&nbsp;&nbsp;&nbsp; **用于构建用户界面的 MVVM 框架、数据驱动视图**
* axios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **用来请求网络请求后端 API 音乐数据**
* vue-router&nbsp;&nbsp;&nbsp;&nbsp; **为单页面应用提供的路由系统 使用了 Lazy Loading Routes 技术来实现异步加载优化性能**
* vue-aplayer&nbsp;&nbsp;&nbsp; **音乐播放组件，实现全局共享音乐**
* element-ui&nbsp;&nbsp;&nbsp;&nbsp; **UI框架布局，使用简单图标，弹框**
* nprogress&nbsp;&nbsp;&nbsp;&nbsp; **轻量级Web进度条提升用户友好性**
* vue-lazyload&nbsp;&nbsp;&nbsp; **节省用户流量，优化页面加载速度，减低性能开销**
* 野狗通信云&nbsp;&nbsp;&nbsp; **提供第三方实时通信引擎服务，记录用户数据**
* 自定义组件&nbsp;&nbsp;&nbsp;&nbsp; **实现组件化开发，全局享用**
#### 项目功能
&ensp;&ensp;1.**用户登录 --完成**

&ensp;&ensp;2.**用户注册 --完成**

&ensp;&ensp;3.**智能搜索 --完成**

&ensp;&ensp;4.**歌曲播放 --完成**

&ensp;&ensp;5.**下载收藏 --完成**

&ensp;&ensp;6.**歌词同步 --完成**

&ensp;&ensp;7.**下拉刷新 --完成**

&ensp;&ensp;8.**歌曲分类 --完成**

&ensp;&ensp;9.**歌曲推荐 --完成**

&ensp;&ensp;10.**歌手筛选 --完成**

&ensp;&ensp;11.**歌曲排名 --完成**

#### **部分页面展示(查看所有页面请[观看网站](http://feifei.ink))**
#### **首页、播放页面**

![图片](http://thyrsi.com/t6/675/1551432964x2890174040.png)![图片](http://thyrsi.com/t6/675/1551433035x2890174040.png)

#### **搜索页面、我的页面**
![图片](https://img-blog.csdnimg.cn/2019031419164298.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70)![图片](https://img-blog.csdnimg.cn/20190314190949920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70)

### 最后总结
---
1、因为不是百度音乐官方(千千音乐),在一些接口数据上并不是很齐全，比如获取歌单,KTV,歌曲MV,歌手演出,不过后期我会收集数据并搭建后端服务完成，目前数据库已经开始设计。

2、项目中有些的功能复杂有的简单。特别个个组件直接传到数据，父子组件/兄弟组件/祖孙组件，并且类型居多，众多的数据和逻辑一度让人很头疼，在设计初期花了点时间。不过在慢慢建设中，渐渐熟悉了困难一点点解决。也很高兴在遇到难点时候一直没有放弃。

3、在项目数据共享这块采用Vue官网提供的依赖注入(provide/inject)取代Vuex，这点和很多使用Vue做音乐项目的作者有所不同，虽然Vuex帮助我们处理共享状态管理，但它还带来了更多概念和样板的成本。(不过在后期的版本迭代中会新出目前还没有实现的功能木块，到时候会使用上Vuex，大型单页面应用中因为vuex的存在，表现依然出色，在处理复杂交互逻辑的时候，vuex的存在是不可或缺的。所以说利用 vue + vuex 完全可以去做大型的单页面项目)

4、网站开始写,从登陆、注册、首页、歌单、专辑、歌手、分类、榜单、智能搜索、收藏下载、个人中心等等...所有流程走完后，不但对vue的理解更深一层，而且对以后掌控大型项目的时候也有非常多的帮助，做一个实际的项目才能对自己有很大的提升。

5、开发期间，出现了很多问题，曾一度怀疑，花几个月的时间做这样一个项目到底有没有意义。期初打算是上手Vue练习下，结果不知不觉越做越大，到后来也更喜欢上它了，所有坚持下来后我相信一切都是值得的。

6、通过学习开发一个 Vue 多功能项目，让自己更熟练的使用 Vue框架、模块化开发、ES6/7 等等知识，提高自己的技术能力。

---

### install dependencies
```
npm install
```

### serve with hot reload at localhost:8080
```
npm run dev
```

### build for production with minification
```
npm run build
```

