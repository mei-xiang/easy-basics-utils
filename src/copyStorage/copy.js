// 我们在开发过程中很多时候本地运行需要去线上复制token等参数，一天得复制几十次很容易把自己累死。
// 于是我就发明了这款一键复制功能，设计非常人性 
export default class copyDos {
    constructor(options = {
        copyDos: 'copyStorage'
    }) {
        this.options = options
        // 设置拷贝命令
        window[options.copyDos ? options.copyDos : 'copyStorage'] = this.copyStorage
        window.writeStorage = this.writeStorage
    }

    copyStorage = () => {
        let copyObj = {
            localStorage: {},
            sessionStorage: {},
        }

        for (let i = 0, len = localStorage.length; i < len; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            if (this.options?.localStorage) {
                if (Array.isArray(this.options?.localStorage) && this.options?.localStorage.includes(key)) {
                    copyObj.localStorage[key] = value
                }
            } else {
                copyObj.localStorage[key] = value
            }
        }
        for (let i = 0, len = sessionStorage.length; i < len; i++) {
            let key = sessionStorage.key(i);
            let value = sessionStorage.getItem(key);

            if (this.options?.sessionStorage) {
                if (Array.isArray(this.options?.sessionStorage) && this.options?.sessionStorage.includes(key)) {
                    copyObj.sessionStorage[key] = value
                }
            } else {
                copyObj.sessionStorage[key] = value
            }
        }

        copyObj = JSON.stringify(copyObj)
        copyObj = encodeURI(copyObj)
        copyObj = btoa(copyObj)
        let htmlStr = `
            <div id="utils-copy-dom" style="width: 100vw;height: 100vh;position: fixed;top: 0px; left: 0px; display: flex; justify-content: center; align-items: center; z-index: 9999999; background-color: rgba(255, 255, 255, 0.3);backdrop-filter: blur(10px);box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);">
                <div  style="width: 300px;">
                    <textarea type="textarea" id="textToCopy" value="复制这段文本" style="width: 100%; font-size: 12px; border: 1px solid #e5e5e5; padding: 10px; border-radius: 10px; overflow: hidden;"  rows="6"></textarea>
                    <button id="copyButton" style="font-size: 14px; display: block; width: 110px; background-color: rgba(0, 0, 0, 0); border-radius: 10px; border: 1px solid #ff6633; color: #ff6633; height: 36px; margin: 10px auto; cursor: pointer;" title="点击复制">复制到剪贴板</button>
                </div>
            </div>
        `
        document.body.innerHTML += htmlStr;
        document.getElementById('textToCopy').value = `writeStorage('${copyObj}')`
        console.log('请点击页面“复制到剪贴板”按钮');
        document.getElementById('copyButton').addEventListener('click', async () => {
            const textToCopy = document.getElementById('textToCopy')
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy.value)
                    .then(() => {
                        console.log('复制成功！')
                    })
                    .catch(() => {
                        console.log("复制失败，请手动选择文本框内容复制");
                    });
                this.removeFun()
            } else {
                textToCopy.focus();
                textToCopy.select();
                new Promise((resolve, reject) => {
                    // 执行复制命令并移除文本框
                    document.execCommand("copy") ? resolve() : reject(new Error("出错了"));
                }).then(
                    () => {
                        console.log("复制成功！");
                        this.removeFun()
                    },
                    () => {
                        console.log("复制失败，请手动选择文本框内容复制");
                        this.removeFun()
                    }
                );
            }
        });
    }

    removeFun = () => {
        if(document.getElementById('textToCopy')  === null){
            return
        }
        document.getElementById('textToCopy').value = ''
        document.getElementById('copyButton').removeEventListener('click', () => { });
        let element = document.getElementById("utils-copy-dom");
        element.remove();
    }

    writeStorage(str) {
        let timestamp = new Date().getTime();
        str = atob(str);
        // 编码转字符串
        str = decodeURI(str);
        str = JSON.parse(str);

        let localStorageTable = []
        Object.keys(str.localStorage).forEach(i => {
            localStorage.setItem(i, str.localStorage[i]);
            localStorageTable.push({
                key: i,
                status: 'success'
            })
        });
        console.group('写入详情');
        console.table(localStorageTable)

        let sessionStorageTable = []
        Object.keys(str.sessionStorage).forEach(i => {
            sessionStorage.setItem(i, str.sessionStorage[i]);
            sessionStorageTable.push({
                key: i,
                status: 'success'
            })
        });
        console.table(sessionStorageTable)
        return `写入耗时：${(new Date().getTime() - timestamp) / 1000} 秒`
    }
}