<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">在线后台管理</span>
        <el-form :model="registerUser" :rules="rules" label-position="left" ref="registerForm"
                 label-width="80px" class="registerForm">

          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输邮箱"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="请再输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="用户类型">
            <el-select v-model="registerUser.identity" placeholder="前选择身份" style="width: 230px">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
          </el-form-item>

        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    var validatePass2 = (rule,value,callback)=>{
      if(value !== this.registerUser.password){
        callback(new Error('两次输入的密码不一致'))
      }else {
        callback()
      }
    }

    return{
      registerUser:{
        name:'',
        email:'',
        password:'',
        password2:'',
        identity:''
      },
      rules:{
        name:[
          {
            required:true,
            message:'用户名不能为空',
            trigger:'blur'
          },{
            min:2,max:15,message: '长度应该在2-15之间',
            trigger: 'blur'
          }
        ],
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
        ],
        password2:[
          {
            required:true,
            message:'请再次输入密码',
            trigger:'blur'
          },{
            validator:validatePass2,
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
          this.$axios.post('/api/user/register',this.registerUser)
          .then(value => {
            //注册成功
            this.$message({
              message:'账号注册成功',
              type:'success'
            })
          }).catch(reason => {
            console.log(reason)
            //注册失败
            this.$message({
              message:'账号注册失败',
              type:'error'
            })
          })
          this.$router.push('/login')

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
  .register{
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/bgimg.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .form_container{
    width: 370px;
    height: auto;
    position: absolute;
    top:10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
  }
  .form_container .manage_tip .title{
    font-family: "Microsoft YaHei",serif;
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
    box-shadow: 0px 5px 10px #cccc;
  }
  .submit_btn{
    width: 100%;
  }
</style>