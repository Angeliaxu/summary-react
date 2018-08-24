<template>
    <div id='login_box'>
		<div class='icon clearfix'>
            <i class="fl"></i>
            <span class="fl">登录</span>
        </div>
        <div class="inputArea">
            <Input placeholder="电子邮箱" 
            v-model="username"
            style="width: 320px" 
            size="large"
            @on-change = 'emailfail=false'
            autofocus
            />
            <div class='password'>
                <transition name="slide-fade">
                    <p v-if='emailfail'>输入的邮箱格式不正确</p>
                </transition>
                <transition name="slide-fade">
                    <Input placeholder="密码" 
                    style="width: 320px" 
                    size="large"
                    autofocus
                    v-if='emailpass'
                    />
                </transition>
            </div>
            <div class="remember">
                <input type="checkbox"/>
                <span>30天之内记住我</span>
            </div>
            <Button type="success" long
            @click="ensure"
            >{{emailpass?'登录':'继续'}}</Button>
        </div>
        <div class="sign">
            <p>没有账号？</p>
            <div>创建账号</div>
        </div>
	</div>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            password:'',
            emailfail:false,
            emailpass:false
        }
    },
    methods:{
        ensure(){
            //正则验证邮箱是否符合
            let re = /^[\w.-]+@([0-9a-zA-Z\w-]+\.)+[0-9a-zA-Z]{2,8}$/i
            this.emailfail = !re.test(this.username);
            this.emailpass = re.test(this.username);
            if(this.emailpass){

            }
        }
    }
}
</script>

<style>
    @import '../../assets/css/login.css';
    @import '../../assets/css/global.css';
</style>
