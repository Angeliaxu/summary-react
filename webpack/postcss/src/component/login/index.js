import React,{Component} from 'react';

class Login extends Component{
    render(){
        return(
            <li className="initial">
                <a id="newRegister" 
                    className="header-button header-regist ml20 registerFedilog"
                >注册</a>
                <a className="header-button header-login">登录</a>
            </li>
        )
    }
}

export default Login