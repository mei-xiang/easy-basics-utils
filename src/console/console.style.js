// 美化打印实现方法
const prettyLog = () => {
    const isEmpty = (value) => {
        return value == null || value === undefined || value === '';
    };
    const prettyPrint = (title, text, color) => {
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        );
    };
    const info = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Info' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#909399');
    };
    const error = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Error' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#F56C6C');
    };
    const warning = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Warning' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#E6A23C');
    };
    const success = (textOrTitle, content = '') => {
        const title = isEmpty(content) ? 'Success ' : textOrTitle;
        const text = isEmpty(content) ? textOrTitle : content;
        prettyPrint(title, text, '#67C23A');
    };
    const img = (url, scale = 1) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            const c = document.createElement('canvas');
            const ctx = c.getContext('2d');
            if (ctx) {
                c.width = image.width;
                c.height = image.height;
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.drawImage(image, 0, 0);
                const dataUri = c.toDataURL('image/png');
     
                console.log(
                    `%c sup?`,
                    `font-size: 1px;
                    padding: ${Math.floor((image.height * scale) / 2)}px ${Math.floor((image.width * scale) / 2)}px;
                    background-image: url(${dataUri});
                    background-repeat: no-repeat;
                    background-size: ${image.width * scale}px ${image.height * scale}px;
                    color: transparent;
                    `
                );
            }
        };
        image.src = url;
    };
    return {
        info,
        error,
        warning,
        success,
        img
    };
};
export default prettyLog