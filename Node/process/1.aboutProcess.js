/* 
    process是一个全局变量，不必require
    argv：获取通过node传递过去的参数返回的数组，第一个是process.exectPath（返回启动node.js进程的绝对路径），第二个是关于此文件的路径，第三个是传递过去的参数
*/
console.log(process.arch) // x64
console.log(process.argv) // [ '/usr/local/bin/node','/Users/xuchang/summary-react/Node/process/1.aboutProcess.js','--version' ]
console.log(process.cwd())

process.stdin.on('data', (data) => {
    // console.log(data.toString())
    process.stdout.write(data.toString())
})
