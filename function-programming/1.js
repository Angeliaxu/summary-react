/* 
    1. 大多数有用的纯函数至少接受一个参数
    2. 大多数有用的纯函数必须有返回值
    3. 纯函数总是接受相同的输入，得到相同的输出
    4. 纯函数是没有副作用的

*/

/* 
    纯函数：下面这个方法就是一个纯函数，函数add 没有读取变量z,没有改变z的值，仅仅只读了x和y，并且返回了x与y相加的值
    如果函数add操作了z，那么函数add就不是一个纯函数了。
*/
let z = 10;
function add(x, y) {
    return x+y
}
/* 
    下面这是一个纯函数，只处理了他输入的值。但是没有返回，那么这个纯函数就没有必要了
*/
function addNoReturn(x, y) {
    let z = x + y;
}
/* 
    再来看看add这个函数，看如下的输出，运行add总是输出3，因为add是一个纯函数。如果add使用到了外面的value，这样每次运行add的时候
    你没办法预测它会输出什么
*/
console.log(add(1, 2)); // prints 3
console.log(add(1, 2)); // still prints 3
console.log(add(1, 2)); // WILL ALWAYS print 3

/* 
    因为纯函数是不能改变外部的变量，所以下面这样函数不是纯函数。这些函数我们认为是有副作用的，
    当调用这些函数的时候，这些函数改变了文件、数据库表，发送数据到服务器或者建立socket连接。
    他们不仅处理传进来的参数并且有返回值，然而，你没办法预测这些函数会有什么样的返回。
*/
writeFile(fileName);
updateDatabaseTable(sqlCmd);
sendAjaxRequest(ajaxRequest);
openSocket(ipAddress);

/* 
    在命令式式编程语言里面，副作用是到处存在的，如果一个变量在错误的时间点改变成了一个错误的值，那这样的话你怎样去debug，
    在函数式编程，你不仅仅是在写纯函数。
*/