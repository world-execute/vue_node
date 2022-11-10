<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <router-link to="/home">
          <img src="../assets/logo.png" class="logo" alt="">
          <span class="title" style="color:#fff">后台管理系统</span>
        </router-link>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userInfo">
          <img src="../assets/avatar.jpg" class="avatar" alt="">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "HeadNav",
  methods:{
    setDialogInfo(command){
      // console.log(command)
      switch (command){
        case "info":
          this.showInfoList();
          break
        case "logout":
          this.logout();
          break
      }
    },
    showInfoList(){
      // console.log('个人信息')
      this.$router.push('infoshow')
    },
    logout(){
      // 清除token
      localStorage.removeItem('userToken')
      // 清除Vuex中的数据
      this.$store.dispatch('clearCurrentState')
      // 跳转
      this.$router.push('/login')
    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
.head-nav{
  width: 100%;
  height: 50px;
  min-width: 600px;
  padding: 5px;
  background: #4b5cc4;
  color: #fff;
  border-bottom: 1px solid #42b983;
}
.el-dropdown{
  color: #ffffff;
}
.logo-container {
  margin-left: 10px;
  line-height: 50px;
  width: 200px;
  min-width: 200px;
}
.logo {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
  margin-left: 10px;
}
.user {
  line-height: 50px;
  text-align: right;
  float: right;
  padding-right: 10px;
  margin-right: 20px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 15px;
}
.avatarname {
  color: #409eff;
  font-size: 15px;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
