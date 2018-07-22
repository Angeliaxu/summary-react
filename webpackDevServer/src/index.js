import {a} from './a';

var root = document.getElementById('root');

var ele = a();
// root.appendChild(div);
root.appendChild(ele);

if(module.hot){
    module.hot.accept('./a.js',function(){
        root.removeChild(ele);
        var componentA =require('./a').a;
        var a = componentA();
        root.appendChild(a);
        ele = a;
    });
}