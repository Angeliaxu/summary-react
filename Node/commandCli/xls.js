const program = require('commander');
const fs = require('fs');

// 模拟ls命令
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
                    str += ` [目录] ${item} \r\n`
                } else {
                    str += ` [文件] ${item} \r\n`
                }
            })
            console.log(str)
        } catch (error) {
            console.log(error)
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
program.parse(process.argv)