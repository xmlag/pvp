<template>
  <div>
    <div class="topbar bg-dark py-2 px-3 d-flex ai-center">
      <div><img src="../assets/logo.png" alt="" height="30"></div>
      <div class="flex-grow-1 pl-3">
        <p class="text-white pb-1">王者荣耀</p>
        <p class="text-gray fs-xxs">团队成就更多</p>
      </div>
      <div>
        <button type="button" class="btn">立即下载</button>
      </div>
    </div>
    <div class="bg-primary p-2">
      <div class="nav nav-inverse p-1 text-white jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.topbar{
  position:sticky;
  top:0;
  z-index:99;
}
</style>