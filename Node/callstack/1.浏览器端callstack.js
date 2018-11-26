function foo () {
    throw new Error('Oops');
}
function bar (){
    foo();
}
function baz(){
    bar()
}
baz();
function aa () {
    baz();
}
function bb () {
    aa()
}
function cc(){
    bb();
}
function dd() {
    cc()
}
function ee(){
    dd()
}
function ff(){
    ee();
}
function gg(){
    ff()
}
function hh(){
    gg();
}
function ii() {
    hh();
}
// ii();
// print stack tree
