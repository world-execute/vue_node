import axios from "axios";
import {Loading,Message} from 'element-ui'
import router from "@/router";

let loading
function startLoading() {
    loading = Loading.service({
        lock:true,
        text:'拼命加载中...',
        background:'rgba(0,0,0,0.7)'
    })
}

function endLoading(){
    loading.close()
}
// 请求拦截
axios.interceptors.request.use(value => {
    //加载动画
    startLoading()

    if(localStorage.getItem('userToken')){
        // 配置请求头
        value.headers.Authorization = localStorage.getItem('userToken')
    }

    return value
},error => {
    return Promise.reject(error)
})


// 响应拦截
axios.interceptors.response.use(value => {
    // setTimeout(()=>{
    //     endLoading()
    //     return value
    // },1000)
    endLoading()
    return value

},error => {
    endLoading()
    // 获取Token验证失败的状态码
    const {status} = error.response
    if(status === 401){
        // 代表已经失效
        Message.error('Token已经失效,请重新登录')
        // 清除Token
        localStorage.removeItem('userToken')
        // 跳转到登录页面
        router.push('/login')
    }
    // Message.error(error.response.data);
    return Promise.reject(error)
})

export default axios;