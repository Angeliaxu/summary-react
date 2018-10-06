/**
 * npm search packagename：搜索包名
 *  popularity：流行度，下载次数
 *  quality：质量、稳定性、测试、依赖等
 *  maintenance：维护等级、更新频率
 *  optimal：综合以上三点
 * 
 * npm ls：查看已安装的包
 * npm update：升级依赖包
 * npm uninstall：删除依赖包
 * 
 * npm 发布自己的包
 *  package.json文件：项目说明配置文件，该文件描述了当前包的信息，只有拥有package.json文件的项目才可以被发布
 *  生产环境下的包和开发环境下的包有什么区别：
 *      生产环境下的包主要是搭建这个项目所需要使用的框架，比如vue，react，vue-router，react-router等，生产环境的包
 *      开发环境下的包主要是辅助我们快速开发所需要的辅助，比如说babel。webpack这些
 *      这两者还需要多点实战去体验
 * 
 *  在发布包中遇到的小难点：
 *      1.首先需要OTP认证，在手机上下载auth验证软件
 *      2.发布的包名如果不正确（和npm已有的包名重复），会导致包上传不上去。
 */