/**
 * Created by zhouhao on 16-5-6.
 */
mini_debugger = false;
function showTips(msg, state) {
    mini.showTips({
        content: msg,
        state: state || 'success',
        x: 'center',
        y: 'top',
        timeout: 3000
    });
}

function openWindow(url, title, width, height, ondestroy) {
    mini.open({
        url: url,
        showMaxButton: true,
        title: title,
        width: width,
        height: height,
        maskOnLoad: false,
        ondestroy: ondestroy
    });
}
function closeWindow(action) {
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
}
function bindDefaultAction(grid) {
    grid.un("loaderror", function (e) {
    });
    grid.on("loaderror", function (e) {
        var res = mini.decode(e.xhr.responseText);
        if (res.code == 401) {
            openWindow(Request.BASH_PATH + "admin/login.html?uri=ajax", "请登录", "600", "400", function (e1) {
                if ("success" == e1)
                    grid.reload();
            });
        }
        if (res.code == 403) {
            showTips("权限不够", "danger");
        }
        if (res.code == 500) {
            showTips("数据加载失败:系统错误", "danger");
            if (window.console) {
                window.console.log(res.message);
            }
        }
    });
}
