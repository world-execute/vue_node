<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理</span>
        <el-form :model="loginUser" :rules="rules" label-position="left" ref="loginForm"
                 label-width="60px" class="registerForm">

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输邮箱"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="toReg">
            <router-link to="/register">还没有账号?点击我注册</router-link>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
export default {
  name: "Login",
  data(){
    return{
      loginUser:{
        email:'',
        password:'',
      },
      rules:{
        email:[
          {
            required:true,
            message:'邮箱不能为空',
            trigger:'blur'
          },{
            type:'email',
            message:'邮箱格式不正确',
            trigger:'blur'
          }
        ],
        password:[
          {
            required:true,
            message:'密码不能为空',
            trigger:'blur'
          },{
            min:6,max:15,
            message: '密码长度应该在6-15之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods:{
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/user/login',this.loginUser)
              .then(value => {
                //登录成功
                //获取token
                // console.log(value)
                const {token} = value.data
                //存储token
                localStorage.setItem('userToken',token)

                //解析token
                const decode = jwt(token);
                // console.log(decode)
                //token存入vuex
                this.$store.dispatch('setAuthenticated',!this.isEmpty(decode))
                this.$store.dispatch('setUser',decode)

                // 使用消息栏提示用户登录成功
                this.$message({
                  message:'登录成功',
                  type:'success'
                })

                // 跳转到首页
                this.$router.push('/index')

              }).catch(reason => {
            //注册失败
            console.log(reason)
            const {msg} = reason.response.data
            this.$message({
              message:msg,
              type:'error'
            })
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    isEmpty(value){
      return(
        value === undefined || value === null ||
          (typeof value === 'object' && Object.keys(value).length === 0) ||
          (typeof value === 'string' && value.trim().length === 0)
      )
    }

  }
}
</script>

<style scoped>
.login{
  position: fixed;
  width: 100%;
  height: 100vh;
  background: url("../assets/bgimg.png") no-repeat center center;
  background-size: 100% 100%;
}
.form_container{
  width: 370px;
  height: auto;
  margin: 10% auto;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm{
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.80);
  backdrop-filter: blur(5px);
  padding: 40px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #cccc;
}
.submit_btn{
  width: 100%;
}
.toReg{
  width: auto;
  height: 15px;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.toReg a{
  font-size: 15px;
  color: black;
}
.toReg a:hover{
  text-decoration: underline;
  color: #3f9dfd;
}

</style>
