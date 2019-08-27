import request from './request'
import apiPath from './apiPath'
function getCategoryTree() {
    return request.get(`${apiPath.getCategoryTree}`).then(data=>{
        console.log(data)
    })
}
