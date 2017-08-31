import {createStore,applyMiddleware} from 'redux';
/*
 导入createStore包和中间件applyMiddleware
 * */
import $ from 'jquery';
import thunk from 'redux-thunk';
/*导入中间件中需要使用的拦截dispatch的thunk，每当有dispatch发起任务时，都会去拦截，判断是函数还是对象
 	如果是函数，则中间件执行函数，但是如果不使用中间件的话，（dispatch里面只能放对象），则报错。
 * 
 * */
//
let store=createStore(counter,applyMiddleware(thunk));
/*
 	创建一个store，一个store就是一个容器，用来保存数据，一个应用只能有一个store
 * */
function counter(state=0,action){
	let {type}=action;
	switch(type){
		case 'INCREMENT':
			return ++state;
		case 'DECREMENT':
			return --state;
		default:
		return state;
	}
}
function increment(){
	return {type:'INCREMENT'}
}
function decrement(){
	return {type:'DECREMENT'};
}
//function initial(){
//	if(!(store.getState()%2===0)){
//		return {type:'INCREMENT'}
//	}else{
//		return {type:null}
//	}
//
//}

//利用中间键来拦截所有的dispatch，如果发现是函数的话，会执行函数，函数里面如果有dispatch，就去再次判断是obj还是函数，
//如果是obj的话,分发任务,不满足条件,就什么都不做
function initial(){
	return function(dispatch,getState){
		if(!(getState()%2===0)){
			dispatch({type:'INCREMENT'})
		}
	}
}

let $in=$('#increment'),
	$de=$('#decrement'),
	$val=$('#val'),
	$ifodd=$('#ifodd');
$in.click(function(){
	store.dispatch(increment())
})
$de.click(function(){
	store.dispatch(decrement())
})
$ifodd.click(function(){
	store.dispatch(initial())
})
store.subscribe(()=>{
//	console.log(store.getState)
	$val.val(store.getState())
})
