export default class Acomponent extends Component{
    render(){
        return(
            <div>
                <p>这是a组件中的图片</p>
                <img src={require("../images/header/serve.jpg")} alt=""/>
            </div>
        )
    }
}