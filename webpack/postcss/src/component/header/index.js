import React,{Component} from 'react';
import './header.scss';
import img from '../../images/logo.png';
import Login from '../login';



export default class Header extends Component{
    render(){
        return( 
            <header className="header-wrap">
                <div className="content clearfix">
                    <a className="logo-link" href="/" >
                        <img className="logo" src={img} alt=""/>
                    </a>
                    <div id="public-layout" className="right-warp right mobileNone">
                        <ul>
                        < Login />
                        </ul>
                    </div>
                </div>
            </header>     
        )
    }
}