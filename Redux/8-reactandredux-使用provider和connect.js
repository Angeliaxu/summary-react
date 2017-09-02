import {applyMiddleware,createStore,bindActionCreators,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider,connect} from 'react-redux';

let initState=[
	{ id: Math.random(),value: 0},
	{ id: Math.random(),value: 0},
	{ id: Math.random(),value: 0},
	{ id: Math.random(),value: 0}
]

function counter(state=initState,action){
	
}
const store=createStore(counter,applyMiddleware(thunk));
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
class Caculator extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div>
				<input type="button" value='-' />
				<span style={{margin:10}}></span>
				<input type="button" value='+' />
				<input type="button" value='when value is odd'/>
			</div>
		)
	}
}
class App extends Component{
	constructor(){}
	render(){
		return(
			<div>
			</div>
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</provider>,
	document.getElementById('root')
)