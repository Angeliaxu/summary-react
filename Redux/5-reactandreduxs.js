import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';

const store=createStore(counter,applyMiddleware(thunk));
function counter(state={val:0},action){
	let {val}={...state};
	switch (action.type){
		case 'INCREMENT':
			return {...state,val:++val};
		case 'DECREMENT':
			return {...state,val:--val};	
		default:
			return {...state,val};
	}
}
 
function increment(){
	return {type:'INCREMENT'}
}
function decrement(){
	return {type:'DECREMENT'}
}
function odd(){
	return function(dispatch,getState){
		if(!(getState().val%2==0)){
			dispatch({type:'INCREMENT'})
		}
	}
}
//把dispatch提取出来，不在事件函数里面直接disapatch

function bindincrement(){
	return store.dispatch(increment());
}
function binddecrement(){
	return store.dispatch(decrement());
}
function bindodd(){
	return store.dispatch(odd());
}
class Demo extends Component{
	constructor(props){
		super(props)
	
	}
	render(){
		let {store,actions:[bindincrement,binddecrement,bindodd]}=this.props;
		let n=store.getState().val;
		return(
			<div>
				<input  
				type="button"
				value="-" 
				onClick={()=>binddecrement()}
				/>
				<span style={{color:'red',margin:10}}>{n}</span>
				<input 
				type="button" 
				value="+" 
				onClick={()=>bindincrement()}
				/>
				<input  
				type="button"
				value="ifOdd"
				onClick={()=>bindodd()}
				/>
			</div>
		)
	}
}
function render(){
ReactDOM.render(
	<Demo 
	store={store}
	actions={[bindincrement,binddecrement,bindodd]}
	/>,
  document.getElementById('root')
)
}
render();
store.subscribe(render);
