<template>
  <div class="page-hero" v-if="model">
    <!-- topbar  -->
    <div class="topbar bg-dark py-2 px-3 d-flex ai-center">
      <div>
        <img src="../assets/logo.png" alt height="30" />
      </div>
      <div class="flex-grow-1 pl-3">
        <span class="text-white pb-1">王者荣耀</span>
        <span class="text-white pb-1 ml-3">攻略站</span>
      </div>
      <div class="text-white">更多英雄&nbsp;&nbsp;&gt;</div>
    </div>
    <!-- banner -->
    <div class="top" 
      :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column jc-end h-100">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="py-1">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="scores d-flex ai-center">
          <span>难度</span>
          <span class="badge bg-difficult">{{model.scores.difficult}}</span>
          <span>技能</span>
          <span class="badge bg-skills">{{model.scores.skills}}</span>
          <span>攻击</span>
          <span class="badge bg-attack">{{model.scores.attack}}</span>
          <span>生存</span>
          <span class="badge bg-survive">{{model.scores.survive}}</span> 
          <span class="flex-1 text-right text-gray">皮肤：2 &gt;</span>
        </div>        
      </div>
    </div>
    <!-- end of banner  -->
    <div>
      <!-- swiper导航 -->
      <div class="px-2 bg-white">
        <div class="nav d-flex jc-around border-bottom pb-2 pt-3">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <!-- swiper内容 -->
      <swiper>
        <swiper-slide>
          <!-- 整个第一个swiper -->
          <div> 
            <!-- 第一个卡片 -->
            <div class="bg-white p-2 border-bottom">
              <!-- 两个按钮 -->
              <div class="d-flex jc-around">
                <router-link to="/" tag="button" class="btn-lg flex-1 mr-1">
                  <i class="fa fa-play-circle-o"></i>
                  <span>英雄介绍视频</span>
                </router-link>
                <router-link to="/" tag="button" class="btn-lg flex-1 ml-1">
                  <i class="fa fa-image "></i>
                  <span>一图识英雄</span>
                </router-link>
              </div>
              <!-- 技能  -->
              <div class="skills pt-4">
                <div class="icons d-flex jc-around">
                  <div 
                    class="icon"
                    :class="{active: currentSkillIndex === i}" 
                    @click="currentSkillIndex=i"
                    v-for="(item,i) in model.skills"
                    :key="i">
                      <img
                      :src="item.icon" alt="">
                  </div>
                </div>
                <div class="p-2">
                  <div class="d-flex my-3 ai-center">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="ml-4 text-gray fs-sm">
                      （冷却值:{{currentSkill.delay}}消耗:{{currentSkill.cost}}）
                    </span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom my-2"></div>
                  <p class="text-gray">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <!-- 出装推荐 -->
            <m-card plain icon="bolt" title="出装推荐">
              <div class="fs-lg">顺风出装</div>
              <div class="d-flex jc-around items text-center mt-2">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt="">
                  <div class="fs-sm">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom my-2"></div>
              <div class="fs-lg">逆风出装</div>
              <div class="d-flex jc-around items text-center mt-2">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt="">
                  <div class="fs-sm">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <!-- 最佳拍档 -->
            <m-card plain icon="bolt" title="最佳拍档">
              <div class="d-flex partners py-1" v-for="item in model.partners" :key="item._id">
                <img :src="item.hero.avatar" alt="">
                <p class="ml-2">{{item.description}}</p>
              </div>
            </m-card>
            <!-- 几块文本 -->
            <m-card plain icon="bolt" title="使用技巧"><p>{{model.usageTips}}</p></m-card>
            <m-card plain icon="bolt" title="对抗技巧"><p>{{model.battleTips}}</p></m-card>
            <m-card plain icon="bolt" title="团战思路"><p>{{model.teamTips}}</p></m-card>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex:0,
    };
  },
  computed: {
    currentSkill(){
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables';
.page-hero{
  .top{
    height:50vw;
    background-size: auto 100%;
    .info{
      background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
      .badge{
        color: #ccc;
        display: inline-block;
        width:1.2rem;
        height:1.2rem;
        margin: 0 0.3rem;
        // padding:0.2rem;
        line-height: 1.3rem;
        border-radius: 50%;
        text-align: center;
        font-size: 0.5rem;
        border:1px solid rgba(255,255,255,0.3)
      }
    }
  }
  .skills{
    .icons{
      .icon{
        height: 70px;
        width: 70px;
        border: 3px solid map-get($map: $colors, $key: 'white');
        border-radius: 50%;
        &.active{
          border-color:map-get($map: $colors, $key: 'primary') 
        }
        img{
          width: 100%;
        }
      }
    }
  }
  .items{
    img{
      width:45px;
      height:45px;
      border-radius: 50%;
    }
  }
  .partners{
    img{
      height: 40px;
    }
  }
}

</style>