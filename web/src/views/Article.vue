<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 p-2 border-bottom">
      <i class="fa fa-angle-left fs-lg text-blue" ></i>
      <strong class="flex-1 text-ellipsis px-2 fs-lg text-blue">{{model.title}}</strong>
      <div class="text-gray">2019-06-01</div>
    </div>

    <div v-html="model.body" class="pt-3 border-bottom"></div>
    <div class="py-3">
      <div class="d-flex">
        <i class="fa fa-coffee"></i>
        <div class="text-blue">相关推荐</div>
      </div>
      <router-link tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id" class="d-flex">
        <div class="text-ellipsis" style="padding-right:3rem;">{{item.title}}</div>
        <time class="text-gray">{{item.createdAt | fullDate}}</time>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props:{
    id: { required: true }
  },
  watch: {
    id:'fetch'
  },
  filters:{
    fullDate(v){
      return dayjs(v).format('YYYY-MM-DD')
    }
  },
  data(){
    return{
      model:null
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get(`/articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="scss">
.page-article{
  text-align: left;
  p{
    font-size: 1rem;
    line-height: 1.5rem;
    text-align: center;
    img{
      width: 100%;
      height:auto;
    }
  }
  time{
    display: block;
    overflow: hidden;
    width: 25%;
    text-align: right;
    padding-right:0.5rem;
  }
}  
</style>
