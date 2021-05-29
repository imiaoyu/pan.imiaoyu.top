import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // 主页
    {
        path: '/home', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/home/Home.vue'], resolve), //加载文件位置
        meta: {
            title: '主页', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    // 用户部分
    {
        path: '/user/role', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/user/UserRole.vue'], resolve), //加载文件位置
        meta: {
            title: '用户角色', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/user/power', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/user/UserPower.vue'], resolve), //加载文件位置
        meta: {
            title: '权限', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/user', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/user/User.vue'], resolve), //加载文件位置
        meta: {
            title: '用户', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    // 通知部分
    {
        path: '/notice', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/notice/Notice.vue'], resolve), //加载文件位置
        meta: {
            title: '新通知', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/msg', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/notice/Message.vue'], resolve), //加载文件位置
        meta: {
            title: '新留言', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/notice/email', //主页文件位置
        name: 'home', //路由名
        component: resolve => require(['@/views/notice/Email.vue'], resolve), //加载文件位置
        meta: {
            title: '邮件', //网页标题名称
            inside: true, //是否现在在euiadmin后台框架内
            login: true, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    // 注册内容
    {
        path: '/',
        name: 'login',
        component: resolve => require(['@/views/login/Login.vue'], resolve),
        meta: {
            title: '登录',
            inside: false,
            login: false, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/register',
        name: 'register',
        component: resolve => require(['@/views/login/Register.vue'], resolve),
        meta: {
            title: '注册',
            inside: false,
            login: false, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/forget/password',
        name: 'forget_password',
        component: resolve => require(['@/views/login/ForgetPassword.vue'], resolve),
        meta: {
            title: '找回密码',
            inside: false,
            login: false, //是否需要登录才能访问，如果是true则需要登录后才能访问，此时受权限控制，请您注意菜单控制
        },
    },
    {
        path: '/warning',
        name: 'warning',
        component: resolve => require(['@/views/page/Warning.vue'], resolve),
        meta: {
            title: '页面不存在',
            inside: false,
            login: false,
        },
    },
    {
        path: '/error',
        name: 'error',
        component: resolve => require(['@/views/page/Error.vue'], resolve),
        meta: {
            title: '系统错误',
            inside: false,
            login: false,
        },
    },
    // 以上为内置组件
    // 以下为开发组件
    // 富文本编辑器
    {
        path: '/eui/tinymce',
        name: 'error',
        component: resolve => require(['@/views/eui/Editor.vue'], resolve),
        meta: {
            title: 'Tinymce富文本编辑器',
            inside: true,
            login: true,
        },
    },
    // euiadmin图标选择器
    {
        path: '/eui/icon',
        name: 'error',
        component: resolve => require(['@/views/eui/Icon.vue'], resolve),
        meta: {
            title: '图标选择器',
            inside: true,
            login: true,
        },
    },
    {
        path: '/eui/qrcode',
        name: 'error',
        component: resolve => require(['@/views/eui/Qrcode.vue'], resolve),
        meta: {
            title: '二维码',
            inside: true,
            login: true,
        },
    },
    {
        path: '/eui/city/choose',
        name: 'error',
        component: resolve => require(['@/views/eui/CityChoose.vue'], resolve),
        meta: {
            title: '城市选择器',
            inside: true,
            login: true,
        },
    },
    {
        path: '/eui/card',
        name: 'error',
        component: resolve => require(['@/views/eui/Card.vue'], resolve),
        meta: {
            title: 'eui卡片',
            inside: true,
            login: true,
        },
    },
    {
        path: '/eui/file/upload',
        name: 'file_upload',
        component: resolve => require(['@/views/eui/File.vue'], resolve),
        meta: {
            title: '文件上传',
            inside: true,
            login: true,
        },
    },
    {
        path: '/eui/power',
        name: 'file_upload',
        component: resolve => require(['@/views/eui/Power.vue'], resolve),
        meta: {
            title: '权限编辑',
            inside: true,
            login: true,
        },
    },
    // eui表格
    {
        path: '/eui/table',
        name: 'error',
        component: resolve => require(['@/views/table/EuiTable.vue'], resolve),
        meta: {
            title: 'eui表格',
            inside: true,
            login: true,
        },
    },
    // eui表格支持excel导出
    {
        path: '/eui/table/out',
        name: 'error',
        component: resolve => require(['@/views/table/EuiTableOut.vue'], resolve),
        meta: {
            title: 'eui表格支持excel导出',
            inside: true,
            login: true,
        },
    },
    // eui表格支持excel导出,使用exios请求数据
    {
        path: '/table/axios',
        name: 'error',
        component: resolve => require(['@/views/table/EuiTableAxios.vue'], resolve),
        meta: {
            title: '支持与后台交互表格',
            inside: true,
            login: true,
        },
    },
    //echarts饼图
    {
        path: '/echarts/bar',
        name: 'error',
        component: resolve => require(['@/views/echarts/EchartsBar.vue'], resolve),
        meta: {
            title: '饼图',
            inside: true,
            login: true,
        },
    },
    // echarts折线图
    {
        path: '/echarts/line',
        name: 'error',
        component: resolve => require(['@/views/echarts/EchartsLine.vue'], resolve),
        meta: {
            title: '折线图',
            inside: true,
            login: true,
        },
    },
    // echarts中国地图
    {
        path: '/echarts/map',
        name: 'error',
        component: resolve => require(['@/views/echarts/EchartsMap.vue'], resolve),
        meta: {
            title: '中国地图',
            inside: true,
            login: true,
        },
    },
    // 常用页面eui
    {
        path: '/page/eui',
        name: 'error',
        component: resolve => require(['@/views/page/Eui.vue'], resolve),
        meta: {
            title: 'Eui主页',
            inside: true,
            login: true,
        },
    },
    // 404
    {
        path: '/page/warning',
        name: 'error',
        component: resolve => require(['@/views/page/Warning.vue'], resolve),
        meta: {
            title: '404错误页',
            inside: false,
            login: true,
        },
    },
    // 500
    {
        path: '/page/error',
        name: 'error',
        component: resolve => require(['@/views/page/Error.vue'], resolve),
        meta: {
            title: '500错误页',
            inside: false,
            login: true,
        },
    },
    // 文章管理
    {
        path: '/article',
        name: 'error',
        component: resolve => require(['@/views/article/Article.vue'], resolve),
        meta: {
            title: '文章管理',
            inside: true,
            login: true,
        },
    },
    // 文章类别管理
    {
        path: '/article/label',
        name: 'error',
        component: resolve => require(['@/views/article/ArticleLabel.vue'], resolve),
        meta: {
            title: '文章类别管理',
            inside: true,
            login: true,
        },
    },
    // 商品管理
    {
        path: '/apply/goods',
        name: 'error',
        component: resolve => require(['@/views/goods/Goods.vue'], resolve),
        meta: {
            title: '商品管理',
            inside: true,
            login: true,
        },
    },
    // 商品发布
    {
        path: '/apply/goods/release',
        name: 'error',
        component: resolve => require(['@/views/goods/ReleaseGoods.vue'], resolve),
        meta: {
            title: '商品发布',
            inside: true,
            login: true,
        },
    },
    // 设置-权限设置
    // 设置-网站信息设置
    {
        path: '/setting/web',
        name: 'error',
        component: resolve => require(['@/views/setting/WebSetting.vue'], resolve),
        meta: {
            title: '网站设置',
            inside: true,
            login: true,
        },
    },
    // 设置-网站邮箱设置
    {
        path: '/setting/email',
        name: 'error',
        component: resolve => require(['@/views/setting/EmailSetting.vue'], resolve),
        meta: {
            title: '网站邮箱设置',
            inside: true,
            login: true,
        },
    },
    // 个人设置-用户名设置
    {
        path: '/setting/user',
        name: 'error',
        component: resolve => require(['@/views/usersetting/UserSetting.vue'], resolve),
        meta: {
            title: '个人设置',
            inside: true,
            login: true,
        },
    },
    // 个人设置-密码设置
    {
        path: '/setting/password',
        name: 'error',
        component: resolve => require(['@/views/usersetting/PasswordSetting.vue'], resolve),
        meta: {
            title: '密码设置',
            inside: true,
            login: true,
        },
    },
    // socket-客服
    {
        path: '/scoket',
        name: 'error',
        component: resolve => require(['@/views/socket/Socket.vue'], resolve),
        meta: {
            title: 'socket通信-客服',
            inside: true,
            login: true,
        },
    },
    // 访问日志
    {
        path: '/log',
        name: 'error',
        component: resolve => require(['@/views/log/Log.vue'], resolve),
        meta: {
            title: '访问日志',
            inside: true,
            login: true,
        },
    },
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    const user_aside_menu = JSON.parse(localStorage.getItem('aslide_menu'))
    var log_message = ''
    if (to.meta.login) {
        menu: for (let index = 0; index < user_aside_menu.length; index++) {
            for (let i = 0; i < user_aside_menu[index].children.length; i++) {
                if (user_aside_menu[index].children[i].path == to.path) {
                    if (user_aside_menu[index].children[i].vist==1) {
                        document.title = to.meta.title
                        log_message = '权限正确'
                        next()
                        break menu
                    } else {
                        log_message = '您未登录或权限不足'
                        alert(log_message)
                        next({
                            path: from.path
                        })
                        break menu
                    }
                } else if (index == user_aside_menu.length - 1 && i == user_aside_menu[index].children.length - 1) {
                    log_message = '菜单未定义，请您定义菜单'
                }
            }
        }
    }
    else if (to.meta.login == false) {
        log_message = '不需要登录便可访问'
        document.title = to.meta.title
        next()
    } else {
        log_message = '非法路径'
    }
    // 生成访问日志
    const myDate = new Date();
    if (sessionStorage.getItem('vist_log') == null) {
        const log = []
        const vist_data = {
            vist: to,
            vist_date: myDate.toLocaleString(),
            message: log_message,
            user_name: sessionStorage.getItem('user_name')
        }
        log.splice(0, 0, vist_data)
        sessionStorage.setItem('vist_log', JSON.stringify(log))
    } else {
        const log = JSON.parse(sessionStorage.getItem('vist_log'))
        const vist_data = {
            vist: to,
            vist_date: myDate.toLocaleString(),
            message: log_message,
            user_name: sessionStorage.getItem('user_name')
        }
        log.splice(0, 0, vist_data)
        sessionStorage.setItem('vist_log', JSON.stringify(log))
    }
})

export default router