<template>
  <div class="index">
    <head-nav></head-nav>
    <left-menu></left-menu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import HeadNav from "@/components/HeadNav";
import LeftMenu from "@/components/LeftMenu";


export default {
  // name: 'Index',
  components:{
    "head-nav":HeadNav,
    "left-menu":LeftMenu

  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer{
  position: relative;
  top: 0;
  left: 50px;
  width: calc(100% - 50px);
  height: calc(100% - 60px);
  overflow: auto;
}
</style>
