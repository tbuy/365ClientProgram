const app = getApp();

Component({
  properties :{
    adBanner: {
      type: Array,
      default: []
    },
    height: {
      type: String,
      default: '320rpx'
    }
  },
  data: {
    //轮播点
    indicatorDots: true,
    autoplay: true,
    //时间间隔
    interval: 3000,
    //滑动时长
    duration: 400,
  },
  methods: {
    goAdPositionContent(e) {
      if (e.currentTarget.dataset.item) {
        app.goAdPositionContent(e.currentTarget.dataset.item)
      }
    },
  }
})