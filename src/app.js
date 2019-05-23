import Taro, { Component } from '@tarojs/taro';
import '@tarojs/async-await';
import Index from './pages/index';
import './styles/base.scss';

class App extends Component {
  config = {
    pages: ['pages/index/index'],
    window: {
      navigationBarTitleText: 'taro-map',
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#000',
    },
    permission: {
      // 在 app.json 里面增加 permission 属性配置
      'scope.userLocation': {
        desc: '您的位置信息将用于小程序位置接口的效果展示',
      },
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
