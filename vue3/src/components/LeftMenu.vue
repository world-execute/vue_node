<template>
  <div class="leftMenu">
    <el-row class="menu_page">
      <el-col>
        <el-menu
            mode="vertical"
            background-color="#4b5cc4"
            text-color="#fff"
            active-text-color="#409eff"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            >
          <el-menu-item index="0" @click="isCollapse = !isCollapse" >
            <img src="../assets/展开.png" class="open" :class="{rotate:!isCollapse}">
          </el-menu-item>
          <router-link to="/home">
            <el-menu-item index="1">
              <i class="fa fa-margin fa-server"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <template  v-for="item in items" >
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class="'fa fa-margin '+item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="(citem,cindex) in item.children"
                           :to="citem.path" :key="cindex">
                <el-menu-item
                    :index='citem.path'>
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data(){
    return {
      isCollapse:true,
      items: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          children: [{ path: "fundlist", name: "资金流水" }]
        },
        {
          icon: "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    }
  }
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 61px;
  left: 0;
  min-height: 100%;
  background-color: #4b5cc4;
  z-index: 99;
}
.open{
  width: 22px;
  transition: all 0.5s;
}
.rotate{
  rotate:180deg;
}
.controls img{
  width: 30px;
  height: 30px;
}
.el-menu {
  border: none;
  min-width: 60px;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
i{
  font-size: 20px;
}

a {
  text-decoration: none;
}
</style>
