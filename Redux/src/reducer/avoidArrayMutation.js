// recursively use Object.freeze()
const deepFreeze = require('deep-freeze');
const expect = require('expect');

/* 
    1. 使用deepFrezz递归的来冻结对象
    2. 使用expect来进行断言测试

    划重点：
        纯函数不能有副作用，下面的例子中，传入listBefor，在addCounter中改变了listBefor，产生了副作用。
            问题解决： 冻结listBefor，变成不能改变状态。
            concat（）返回新的对象。
            使用数组展开符，返回新的对象
*/

// 例子一

/* const addCounter = (list) => {
    // list.push(0);
    // return list.concat([0]);
    return [...list, 0];
}
const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepFreeze(listBefore)
    expect(
        addCounter(listBefore)
    ).toEqual(listAfter)
    // expected value to equal [], received [0]
}; */

// 例子二,如果我使用了splice方法，他会产生副作用，因为必须返回一个全新的对象

const removeCounter = (list, index) => {
    // list.splice(index, 1)
    return [...list.slice(0, index), ...list.slice(index+1)];
}
const testAddCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    deepFreeze(listBefore)
    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter)
    // expected value to equal [], received [0]
};
testAddCounter();
console.log('All tests passed')