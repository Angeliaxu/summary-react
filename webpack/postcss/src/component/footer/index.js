import './footer.scss';

export default class Footer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <footer>
                <div className="content clearfix">
                    <ul className="list">
                        <li> 
                            <h5>产品</h5>
                            <a href="/office">Office</a>
                            <a href="/cloud">企业云文档</a>
                            <a href="/safety">文档安全</a>
                            <a href="/docService">文档服务</a>
                        </li>
                        <li>
                            <h5>下载</h5>
                            <a href="/download" title="Office套件">Office套件</a>
                            <a href="/download" title="金山PDF">金山PDF</a>
                            <a href="/download" title="企业云文档">企业云文档</a>
                            <a href="/download" title="WPS邮件客户端">WPS邮件客户端</a >
                            <a href="/download" title="金山词霸">金山词霸</a>
                        </li>
                        <li> 
                            <h5>价格</h5>
                            <a href="/price" title="选择套餐">选择套餐</a>
                        </li>
                        <li> 
                            <h5>企业应用</h5 >
                            <p>ProcessOn</p>
                            <p>Coremail</p>
                            <p>上上签</p>
                        </li>
                        <li> 
                            <h5>帮助</h5>
                            <a href="https://wps.kf5.com/hc/" title="常见问题" target="_blank">常见问题</a>
                            <a href="https://wps.kf5.com/hc/kb/article/1008036/ " title="管理员手册" target="_blank">管理员手册</a>
                            <a href="https://wps.kf5.com/hc/kb/article/1008038/" title="产品手册" target="_blank">产品手册</a>
                        </li>
                        <li> 
                            <h5>关于</h5>
                            <a href="http://www.wps.cn/" title="WPS官网" target="_blank">WPS官网</a>
                            <a href="http://ep.wps.cn/about/market.html" title="媒体报道" target="_blank">媒体报道</a>
                            <a href="http://www.wps.cn/jobs/" title="加入我们" target="_blank">加入我们</a>
                            <a href="http://ep.wps.cn/about/brief.html" title="关于金山办公" target="_blank">关于金山办公</a>
                        </li>
                    </ul>
                    <ul className="contactUs-list clearfix">
                        <li>
                            <h5>公有云</h5>
                            <p>400-898-0707</p>
                            <p>周一至周五：9:00-18:00</p>
                            <p className="text">
                                <span>订阅号</span>
                                <span>服务号</span>
                            </p>
                            <img src={require("images/wps+.png")} />
                            <img className="ml20" src={require("images/footer_weixin.png")}/>
                            <div className="contact-us">
                                <div className="icon">
                                <a className="index-icon qq img" href="//shang.qq.com/wpa/qunwpa?idkey=f78873d888b645343a7ba7f8c0141b999154406b395f3800d467f6974c2998c9" alt="WPS+云办公企业粉丝6群" title="WPS+云办公企业粉丝6群" target="_blank"></a>
                                <a className="index-icon mail img" href="mailto:wpsyunding@wps.cn"></a>
                                <a className="index-icon weibo img" href="http://weibo.com/qwpsoffice?refer_flag=1001030101_&amp;is_hot=1" target="_blank"></a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <h5 className="mt10">私有云</h5>
                            <p>400-677-5005</p>
                            <p>周一至周五：9:00-18:00</p>
                            <img className="mt30" src={require("images/wpsCode.png")} />
                            <div className="icon mobileNone">
                                <a className="index-icon mail img" href="mailto:wps@wps.cn"></a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="footer-copy content clearfix text-align-c mobileNone">
                    <b>©️</b>
                    <span>2008-2017 Kingsoft Office Corporation, All Rights Reserved | 粤ICP备13015957-1号</span>
                </div>
                <div className="footer-copy content clearfix text-align-c mobileShow">
                    <b>©️</b>
                    <span>2008-2017 Kingsoft Office Corporation, All Rights Reserved</span>
                    <br/>粤ICP备13015957-1号
                </div>
        </footer>
        )
    }
}