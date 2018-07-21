import './css/common/index.css';
import './css/common/comon.css';

import A from './component/a';

class App extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                <span>在html中引入图片！</span>
                <A/>
                <div className="test"></div>
            </div>
        )
    }
}
ReactDom.render(<App/>,document.getElementById('root'));
