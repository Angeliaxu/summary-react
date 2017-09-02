import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
function counter1(state={val:0},action){
	console.log(1)
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
function counter2(state={val:0},action){
	switch (action.type){
		case 'INCREMENT1':
			return {...state,val:++state.val};
		case 'DECREMENT1':
			return {...state,val:--state.val};
		case 'ODD1':
			return {...state,val:++state.val};
		default:
			return state;
	}
}
let rootercounter=combineReducers({counter1,counter2});
const store=createStore(rootercounter,applyMiddleware(thunk));
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
function increment1(){ 
	return store.dispatch({type:'INCREMENT1'});
}
function decrement1(){
	return store.dispatch({type:'DECREMENT1'});
}
function odd1(){
	return store.dispatch(
		function(dispatch,getState){
		if(!(getState().val%2===0)){
			dispatch({type:'ODD1'})
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
		let {actions:{boundIncrement,boundDecrement,boundInIfOdd},val}=this.props;
		return(
			<div>
				<input type="button" value='-' onClick={()=>boundDecrement()}/>
				<span style={{margin:10}}>{val}</span>
				<input type="button" value='+' onClick={()=>boundIncrement()}/>
				<input type="button" value='when value is odd'onClick={()=>boundInIfOdd()}/>
			</div>
		)
	}
}
class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let{action:{increment,decrement,odd},val1}=this.props.actions1;
		let{action:{increment1,decrement1,odd1},val2}=this.props.actions2;
		return(
		<div>
			<Caculator {...{
                        actions: {
                            boundIncrement: increment,
                            boundDecrement: decrement,
                            boundInIfOdd: odd
                        },
                        val:val1
                        
                    }}/>
			<Caculator {...{
                        actions: {
                            boundIncrement: increment1,
                            boundDecrement: decrement1,
                            boundInIfOdd: odd1
                        },
                        val:val2
                    }}/>
		</div>
		)
	}
}
store.subscribe(render)
function render(){
	ReactDOM.render(
	<App 
	actions1={{
		action:{increment,decrement,odd},
		val1:store.getState().counter1.val
	}}
	actions2={{
		action:{increment1,decrement1,odd1},
		val2:store.getState().counter2.val
	}}
	
	
	/>,
    document.getElementById('root')
);
}
render();
