# Rest tester
* Tester for rest api

## 使用

* 将整个文件夹拷贝到任何服务器中，访问加上 /rest_tester 即可
* 修改 config.json 为自己所需要的接口
* 默认为自动测试登录后的接口
* 可以选择的功能包括：
自动测试登录后的接口  
自动测试登出后的接口  
手动测试所有的接口  

## 参数

* title: 标题
* url: 地址
* method: 方法(GET, POST, PUT, DELETE)
* data: 发送的数据
* login: 表示为登录接口
* logout: 表示为登出接口