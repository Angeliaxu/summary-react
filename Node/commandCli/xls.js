const program = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;

// 模拟ls命令,具体学会怎么使用chalk
/* 
    显示指定目录下的所有文件
*/
program
    .version('1.0.0')
    // .option('-l, --list [path]', '显示目录下的所有文件', __dirname)
    .action(function(){
        try {
            const content = fs.readdirSync(__dirname);
            let str = '';
            content.map((item) => {
                if(fs.statSync(item).isDirectory()) {
                    // str += chalk.red.bold.underline(chalk` [目录] ${item} \r\n`)
                    str += chalk` {green [目录]} {green ${item}} \r\n`
                } else {
                    if(item.startsWith('.')) {
                        str += chalk.red(` [系统文件] ${item} \r\n`)
                    } else {
                        str += ` [文件] ${item} \r\n`
                    }
                }
            })
            log(str)
        } catch (error) {
            log(error)
        }
    })
/* 
    这个想挂在全局地下，随便进行一个目录ls展示所有文件
*/

// program
//     .version('1.0.0')
//     .action(function(cwd){
//         try {
//             // const content = fs.readdirSync(__dirname);
//             // console.log(content)
//         } catch (error) {
//             console.log(error)
//         }
//     })

/* 
    chalk：改变命令行颜色,可以链式调用
    API
        color

*/
program.parse(process.argv)