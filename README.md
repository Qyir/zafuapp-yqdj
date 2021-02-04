# ZAFUapp 每日一报

>**声明：该脚本仅供学习使用，由此产生的一切问题均自行负责，与制作者无关**

脚本参考于&nbsp;&nbsp;[Debuffxb/ZAFU_DDUP](https://github.com/Debuffxb/ZAFU_DDUP)

## 填写内容说明

```javascript
let user_info = {
    userName: '',    // 学号
    enPassword: '',  // 密码
    token: '',       // 不填
    stryqdj: ''      // 不填
};

let content = {
    lng: "",                              //  lng 经度，必填
    lat: "",                              //  lat 维度，必填
    twds: 36.5,                           //  twds 体温度数，选填
    curareaname: "XX省XX市XX县(区)",        //  curareaname 当前区域，选填，注意与经纬度相匹配
    gpsareaname: "XX省XX市XX县",           //  gpsareaname gps定位区域，选填，注意与经纬度相匹配
    gpsaddress: "",                       //  gpsaddress 详细地址，选填
    adcode: "",                           //  adcode 行政区划代码，选填
    citycode: "",                         //  citycode 城市代码，选填
    tbrq: moment().format('YYYY-MM-DD'),  //  tbrq 填报日期，moment函数生成 YYYY-MM-DD
    djsj: moment().valueOf(),             //  djsj 登记时间 moment函数生成 毫秒级时间戳
};
```

> 经纬度获取: [百度地图](https://api.map.baidu.com/lbsapi/getpoint/index.html)<br>
adcode 参考: [2016年统计用区划代码和城乡划分代码](http://www.mca.gov.cn/article/sj/xzqh/1980/2019/202002281436.html)<br>
citycode 参考: [中国内地城市长途区号](http://www.zjcargo.com/tool/incode.htm)

## 使用

建议部署前先进行一次登记，方便获取最新数据

下载根目录的 `node_modules` 文件夹以及阿里云 `Aliyun_Serverless` （或腾讯云 `TencentCloud_Serverless` ）文件夹下的 `index.js` ，并对 `index.js` 文件中的相应内容进行填写。

修改完后将 `index.js` 文件和 `node_modules` 文件夹置于根目录，然后一起打包成 `.zip` 压缩包。



### 阿里云

>[阿里云-函数计算](https://www.aliyun.com/product/fc)

1. 新建函数&nbsp;&nbsp;=>&nbsp;&nbsp;事件函数
2. 运行环境&nbsp;&nbsp;=>&nbsp;&nbsp;Node.JS 12.x
3. 函数代码配置中，选择代码包上传
4. 进入函数后，触发器选项&nbsp;&nbsp;=>&nbsp;&nbsp;创建触发器
5. 时间配置&nbsp;&nbsp;=>&nbsp;&nbsp;Cron表达式

        0 1 16 * * *

### 腾讯云

>[腾讯云-云函数](https://cloud.tencent.com/product/scf)

1. 函数服务&nbsp;&nbsp;=>&nbsp;&nbsp;新建&nbsp;&nbsp;=>&nbsp;&nbsp;自定义创建
2. 运行环境&nbsp;&nbsp;=>&nbsp;&nbsp;Nodejs 12.16
3. 函数代码&nbsp;&nbsp;=>&nbsp;&nbsp;提交方法&nbsp;&nbsp;=>&nbsp;&nbsp;本地上传zip包
4. 触发器配置&nbsp;&nbsp;=>&nbsp;&nbsp;自定义创建
5. 触发方式&nbsp;&nbsp;=>&nbsp;&nbsp;定时触发
6. 触发周期&nbsp;&nbsp;=>&nbsp;&nbsp;自定义触发周期

        0 1 0 * * * *

7. 部署

<br>
阿里云和腾讯云都可以在相应的日志选项中查看执行结果。有能力者也可以在服务器中通过crontab等部署定时任务
