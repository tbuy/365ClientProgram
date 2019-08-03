const apiPath = require("./config.js").apiPath;

module.exports = {
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
    getCategory: apiPath + "/user/service/getCategory",


}