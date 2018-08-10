// 基本类型：Number、Boolean，Null，Undefined
// 特殊类型:Array Tuple Enum Any Nerver Void

var a :boolean = true;

var b :null =null;

// 一组具有相同类型特征的数据的有序的集合。
var arr1 :number[]=[1,2,3];

var arr2 :Array<number>=[1,2,3];

// 0未开始 1开始  2失败，语义化不够强
// 在js里面会这样写

var obj ={
    init:0,
    success:1,
    error:2
}

// 枚举类型

enum Color{Red,Green,Yellow}

// Any 任意类型

