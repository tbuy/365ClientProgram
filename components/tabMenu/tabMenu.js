const app = getApp();

Component({
  properties :{
    menuList: {
      type: Array,
      default: []
    },

  },
  data: {

  },
  methods: {
    selected(e) {
      this.triggerEvent('onMyEvent')
    },
  }
})