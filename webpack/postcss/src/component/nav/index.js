import React,{Component} from 'react';
import  './nav.scss';

const Nav =()=>{
    return(
        <nav className="nav-wrap" id="nav-content">
            <ul className="content navigation">
                <li className="navigation-tier-one navigation-has-secondary">
                    <a href='javascript:void(0);' title="">  产品</a>
                    <div className="navigation-tier-two navigation-products-nav">
                        <ul className="navigation-subnav">
                            <li className="navigation-category">
                                <a href="/office" className="navigation-item">Office</a>
                            </li>
                            <li className="navigation-category">
                                <a href="/cloud" className="navigation-item">企业云文档</a>
                            </li>
                            <li className="navigation-category">
                                <a href="/safety" className="navigation-item">文档安全</a>
                            </li>
                            <li className="navigation-category">
                                <a href="/docService" className="navigation-item">文档服务</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="navigation-tier-one">
                    <a href="" title="公有云"> 公有云 </a>
                </li>
                <li className="navigation-tier-one navigation-has-secondary">
                    <a href='javascript:void(0);' title="">  私有云 </a>
                    <div className="navigation-tier-two navigation-products-nav">
                        <ul className="navigation-products-categories">
                            <li className="navigation-category">
                                <a href="/government" className="navigation-item">国产正版化方案</a>
                            </li>
                            <li className="navigation-category">
                                <a href="/mobileoffice" className="navigation-item">移动办公方案</a>
                            </li>
                            <li className="navigation-category">
                                <a href="/modernity" className="navigation-item">安全防护方案</a>
                            </li>
                        </ul>
                        <ul className="navigation-products-categories">
                            <li className="navigation-category">
                                <a href="/professionalService" className="navigation-item">服务</a>
                            </li>
                            <li className="navigation-category">
                                <a href="/train" className="navigation-item">培训</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="navigation-tier-one">
                    <a href="/blog/" title="博客"> 博客 </a>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;