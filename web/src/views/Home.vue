<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide><img src="../assets/images/lunbo-1.jpeg" alt="" class="w-100"></swiper-slide>
      <swiper-slide><img src="../assets/images/lunbo-2.jpeg" alt="" class="w-100"></swiper-slide>
      <swiper-slide><img src="../assets/images/lunbo-3.jpeg" alt="" class="w-100"></swiper-slide>
      <div class="swiper-pagination swiper-pagination-home text-right pr-3" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <!-- start of m-card -->
    <div class="nav-icon my-4 pt-2 text-center bg-white">
      <div class="d-flex flex-wrap pt-4">
        <div class="nav-item mb-4" v-for="(item,i) in navIconList" :key="i">
          <i class="iconfont" :class="item.iconName"></i>
          <div class="fs-xs pt-1 mb-2">{{item.name}}</div>
        </div>
      </div>
      <div class="arrow bg-light py-2 fs-sm">
        <i class="iconfont icon-arrowup">
        </i>
        <span class="pl-1"> 收起</span>
      </div>
    </div>
    <!-- end of nav-icon -->
    <!-- 新闻资讯 -->
    <m-list-card title="新闻资讯" icon="tasks" :categories="newsCats">
      <template #items="{category}">
        <router-link :to="`/articles/${news._id}`" tag="div"
        v-for="(news,i) in category.newsList" :key="i" class="py-2 d-flex">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="pl-2">|</span>
          <span class="flex-1 text-ellipsis px-2">{{news.title}}</span>
          <span class="text-gray">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
    <m-list-card title="英雄列表" icon="user" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
            :to="`/heroes/${hero._id}`" tag="div"
            v-for="(hero,i) in category.heroList" :key="i" 
            style="width:20%" 
            class="p-2 text-center">
              <img :src="hero.avatar" alt="" class="w-100">
              <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
    <p>111</p>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters:{
    date(v){
      return dayjs(v).format('MM/DD')
    }
  },
  data(){
    return {
      navIconList:[
        {name:"爆料站",iconName:"icon-xinwen"},
        {name:"故事站",iconName:"icon-book"},
        {name:"周边商城",iconName:"icon-Purse"},
        {name:"体验服",iconName:"icon-lubiao"},
        {name:"新人专区",iconName:"icon-xinwen"},
        {name:"荣耀·传承",iconName:"icon-juanzhou-"},
        {name:"同人社区",iconName:"icon-cos"},
        {name:"王者营地",iconName:"icon-xinwen"},
        {name:"公众号",iconName:"icon-gongzonghaocehua"},
        {name:"版本介绍",iconName:"icon-banben"}
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination-home'
        }
      },
      newsCats:[],
      heroCats:[]
    }
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('/news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('/hero/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats(),
    this.fetchHeroCats()
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.swiper-pagination-home{
  .swiper-pagination-bullet{
    opacity:1;
    border-radius: 0.1538rem;
    background-color:white;
    &.swiper-pagination-bullet-active{
      background-color:map-get($colors,"info");
    }
  }
}
.nav-icon{
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
  .nav-item{
    width:25%;
    border-right:1px solid rgba(69, 78, 115, 0.5);
    &:nth-child(4n){
        border-right:none;
      }
    .iconfont{
      font-size:2rem;
      color:rgba(69, 78, 115);
    }
  }
}
</style>