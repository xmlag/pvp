<template>
  <div style="margin-top:1rem;">
    <div class="card bg-white p-3">
      <div 
        class="card-head d-flex p-2 pb-3 jc-center ai-center"
        :class="{'border-bottom':!plain}">
        <i class="fa" :class="`fa-${icon}`"></i>
        <div class="title fs-xl flex-1 pl-2"><strong>{{title}}</strong></div>
        <i class="fa fa-ellipsis-h" v-if="!plain"></i>
      </div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{ type: String, required: true },
    icon:{ type: String, required: true },
    plain:{type: Boolean}
  }
}
</script>

<style lang="scss">
.card{
  .card-head{
    // border-bottom:1px solid #ddd;
  }
}
</style>
