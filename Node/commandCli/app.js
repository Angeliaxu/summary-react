/* 
    command.js是一个用来写node.js交互，就像vue一样的
    API: 
        1.  首先拿到命令行用户输入的参数进行解析，使用process.argv拿参数，使用process.argv拿到的参数需要过滤，使用command下的parse(),可以过滤
            参数。
        2.  version(str，flags?)，当通过命令行输入--version或者-V的时候，可以反馈给用户当前使用shell的版本，当然你也可以修改flags
                str: 版本号
                flags: 指定的option，默认为“-V --version”
        3.  command自动给我们注册了--help参数需要显示的内容
        4.  option(flags, description?, fn?, defaultValue?)
                设置命令选项
                flags：选项标记名称，”-v， --version“
                description：选项使用说明
                fn：默认值，函数返回值为defaultValue，优先级别高于defaultValue
                defaultValue：选项默认值，如果需要的话
*/

/* const program = require('commander');
program
    .version('1.0.0') // 在命令行传入参数--version，-V输出当前shell版本
    .option('-p, --peppers', 'add peppers')
    .option('-P, --pineapple', 'add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .option('--no-sauce', ' remove sauce')
    .parse(process.argv) // 解析用户传入的argv命令字符串参数,command同时会创建 一个--help，-h的选项*/
// console.log('program', program.peppers)
/* console.log('u ordered a pizza with')
if(program.peppers)console.log(' - peppers ')
if(program.pineapple)console.log(' - pineapple ')
if(program.bbqSauce)console.log(' - bbq ')
if(program.sauce){
    console.log('with sauce')
}else{
    console.log('without sauce')
}
console.log(' - %s cheese ', program.cheese)
console.log(program.sauce) */
/* 
    1. 解析用户传入的命令字符串参数：短命令可以列如-p，-P,-b,-c，可写成 -pPbc
    2. 多个word解析成驼峰，列如-bbq-sauce，解析成program.bbqSauce
    3. 通过--no开头的前缀，代表program.值是false。列如：--no-sauce表示program.sauce为false
*/

/* 
    command-specific options

*/
const program = require('commander')
const fs = require('fs')
/* 
    递归删除文件夹
        存在的问题，只能删除文件夹，不能删除文件
*/
function rmFolder(path) {
    // 检查是否存在此路径
    if(fs.existsSync(path)) {
        // 读取该路径下所有文件
        const child = fs.readdirSync(path);
        // 循环子文件
        child.forEach(element => {
            let current = path + '/'  + element;
            // 判断子文件是否是文件夹，是就一直递归，不是就删除文件
            const result = fs.statSync(current).isDirectory();
            if(result) {
                rmFolder(current)
            } else {
                fs.unlinkSync(current)
            }
        });
        fs.rmdirSync(path)
    }
}
program
    .command('rm <dir>')
    .option('-r, --recursive', 'Remove recursively')
    .description('删除文件夹') 
    .action(function (dir, cmd) {
        if(cmd.recursive) {
            rmFolder(dir)
        } else {
            console.log('命令有错')
        }
    })
    // .option('-a, --add-item [item]', '增加项目', function(val){
    //     console.log(val)
    // }, [1,2,3])

program.parse(process.argv)