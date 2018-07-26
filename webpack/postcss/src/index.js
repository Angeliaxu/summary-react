// import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
require("babel-polyfill");
import './css/config/global.scss';
import PlusIndex from './pages/plusindex';

import(/* webpackChunkName:'indexPage' */'./pages/indexPage').then((a)=>{
    console.log(a);
})
//  import('./pages/indexPage').then((a)=>{
//     console.log(a);
//  })
if(process.env.NODE_ENV == 'PRODUCTION'){
    console.log('你正处在线上环境')
}else{
    console.log('你正处在线下环境')
}
console.log(111);
ReactDOM.render(<PlusIndex />,document.getElementById('root'))

if(module.hot){
    module.hot.accept();
}