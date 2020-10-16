export default {
  pages: ['pages/index/index'],
  window: {
    navigationBarTitleText: 'taro-map',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#000',
  },
  permission: {
    'scope.userLocation': {
      desc: '您的位置信息将用于小程序位置接口的效果展示',
    },
  },
};
