const app = getApp();

Component({
  properties :{
    menuList: {
      type: Array,
      default: []
    },
    width: {
      type: String,
      default: ""
    },
  },
  data: {
    list:[]
  },
  methods: {
    selected(e) {
      var _list = this.data.list
      _list.forEach(item=>{
        if (item.id == e.currentTarget.dataset.id){
          item.isHeightlight = true
        }else{
          item.isHeightlight = false
        }
      })
      this.setData({
        list: _list
      })
      this.triggerEvent('selected', { selectId: e.currentTarget.dataset.id})
    },
  },
  attached(){
    var _list = [];
    this.properties.menuList.forEach((item,index)=>{
      if(index == 0) {
        _list.push({ isHeightlight: true, ...item })
      }else{
        _list.push({ isHeightlight: false, ...item })
      }
    })
    this.setData({
      list: _list
    })
  }
})