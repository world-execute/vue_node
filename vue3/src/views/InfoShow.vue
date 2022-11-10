<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img src="../assets/avatar.jpg" class="avatar">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{user.identity}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-envelope"></i>
            <span>{{user.email}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "InfoShow",
  computed:{
    user(){
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
.infoshow {
  width: 60%;
  height: 500px;
  min-width: 600px;
  margin: 5% auto;
  box-sizing: border-box;
  box-shadow: 3px 3px 10px #808080;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%);
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 20%;
  padding: 26px;
  font-size: 24px;
  color: #333;
}
.user-item span{
  margin-left: 15px;
}
.user-item:nth-of-type(3) i{
  font-size: 22px;
}
</style>
