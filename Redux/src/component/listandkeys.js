
import  React from 'react';

export default class Listandkeys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: [1, 2, 3, 4, 5]
        }
    }
    render() {
        // key 值不能作为属性传递，组件也获取不到
        let { num } = this.state;
        const list = num.map((item, index) => (<li key={index}>{item}</li>));
        console.log(list)
        return (
            <ul>
                {list}
            </ul>            
        )
    }
}