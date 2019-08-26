const apiPath = 'https://user.sy365.cn';

export default {
    //获取验证码 get {phone}
    getCaptcha: apiPath + "/user/getCaptcha",

    //登录 post {phone,captcha}
    login: apiPath + "/user/login",



    //编辑用户信息 post {id,name}
    editUser: apiPath + "/user/personal/editUser",

    //上传头像 post {id, icon}
    editIcon: apiPath + "/user/personal/editIcon",

    //获取订单列表(懒加载) get {id,type}
    getOrderList: apiPath + "/user/personal/getOrderList",

    //获取单个订单信息 get {id}
    getOrder: apiPath + "/user/personal/getOrder",




    //获取服务分类 get
    getCategoryTree: apiPath + "/user/service/getCategoryTree",

    //获取服务分类列表 get {id}
    getCategoryDetail: apiPath + "/user/service/getCategoryDetail",

    //立即预约提交表单 post {phone, name}
    submitRequire: apiPath + "/user/service/submitRequire"

}
