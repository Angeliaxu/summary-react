# todolist

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### vuex
最简单的方式：
    组件通过计算属性拿到store中的state值
    组件通过方法来commit 相应的mutations名称改变state值

如果组件有多个应用状态，设置多个计算属性就会冗余，使用mapState函数
mapState 辅助函数
