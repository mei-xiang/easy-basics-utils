## 简介
我们在开发过程中很多时候本地运行需要去线上复制token等参数，一天得复制几十次很容易把自己累死。  
于是我就发明了这款一键复制功能，设计非常人性，操作也很简单接下来我给大家展示下。

```
// 引入
import { copyStorage } from 'easy-basics-utils'

// 初始化
new copyStorage()

// 初始化成功后可直接在浏览器控制台 输入 copyStorage(),之后会在界面中弹出复制按钮，点击即可复制到剪贴板
// 然后把剪贴板复制到的内容粘贴到，本地环境浏览器控制台，即可完成写入

// 当然也可，自定义命令,如下所示 此时拷贝命令换成了 diyCopy()
new copyStorage({copyDos:'diyCopy'})

// 自定义拷贝范围,如下所示只会拷贝localStorage中的token，sessionStorage为空数组则不拷贝，不填则默认拷贝全部
new copyStorage({localStorage:['token'],sessionStorage:[]})
```

