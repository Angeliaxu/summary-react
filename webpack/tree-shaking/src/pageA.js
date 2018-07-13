require.include('./pageB.js');
require.ensure([],function(){
    var x = require('./moduleA');
    
},'moduleA')
require.ensure([],function(){
    var y = require('./moduleB');
    
},'moduleB')
require.ensure([],function(){
    var _ = require('lodash');
    
},'vendor')
export default 1;