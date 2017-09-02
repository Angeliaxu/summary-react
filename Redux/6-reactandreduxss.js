import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store=createStore(counter,applyMiddleware(thunk));
function counter(state={val:0},action){
	console.log(state.val)
	switch (action.type){
		case 'INCREMENT':
			return {...state,val:++state.val};
		case 'DECREMENT':
			return {...state,val:--state.val};
		case 'ODD':
			return {...state,val:++state.val};
		default:
			return state;
	}
}
//creator action，发起action时，事件发起时，首先得是dispatch（），由中间件再去判断是函数还是对象
function increment(){
	return store.dispatch({type:'INCREMENT'});
}
function decrement(){
	return store.dispatch({type:'DECREMENT'});
}
function odd(){
	return store.dispatch(
		function(dispatch,getState){
		if(!(getState().val%2===0)){
			dispatch({type:'ODD'})
		}
	}
)	 
}

//组件里面接受的参数，在外面都是定义好的，组件负责渲染，最好不要将太多的逻辑操作放在组件里面
class Caculator extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let {val,actions:[increment,decrement,odd]}=this.props;
		console.log(val)
		return(
			<div>
				<input type="button" value='-' onClick={()=>decrement()}/>
				<span style={{margin:10}}>{val}</span>
				<input type="button" value='+' onClick={()=>increment()}/>
				<input type="button" value='when value is odd' onClick={()=>odd()}/>
			</div>
		)
	}
}
store.subscribe(render)
function render(){
	ReactDOM.render(
<Caculator actions={[increment,decrement,odd]} val={store.getState().val}/>,
    document.getElementById('root')
);
}
render();
