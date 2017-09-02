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
class Demo extends Component{
	constructor(props){
		super(props)
	
	}
	render(){
		let {store,actions:[increment,decrement,odd]}=this.props;
		let n=store.getState().val;
		return(
			<div>
				<input  
				type="button"
				value="-" 
				onClick={()=>{store.dispatch(decrement())}}
				/>
				<span style={{color:'red',margin:10}}>{n}</span>
				<input 
				type="button" 
				value="+" 
				onClick={()=>{store.dispatch(increment())}}
				/>
				<input  
				type="button"
				value="ifOdd"
				onClick={()=>{store.dispatch(odd())}}
				/>
			</div>
		)
	}
}
function render(){
ReactDOM.render(
	<Demo 
	store={store}
	actions={[increment,decrement,odd]}
	/>,
  document.getElementById('root')
)
}
render();
store.subscribe(render);
