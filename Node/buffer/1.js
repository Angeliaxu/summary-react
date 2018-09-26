
/* 
    位 > 字节
    0&&1 > 8位（256种变化方式）
    ascii码：256种
    utf-8：一个中文字符占三个字节

*/
const buf1 = Buffer.alloc(10) // <Buffer 00 00 00 00 00 00 00 00 00 00>
const buf2 = Buffer.alloc(5, 1) // <Buffer 01 01 01 01 01>
const buf3 = Buffer.allocUnsafe(10)
// const buf4 = Buffer.alloc('string') // 报错，必须是数子
// const buf5 = Buffer.alloc(buf1); // 报错，必须是数子
const buf6 = Buffer.from([1,2,3])
for(const i of buf6){
    console.log(i)
}
console.log(buf6)