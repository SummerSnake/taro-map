import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Input, Map, ScrollView } from '@tarojs/components';
import QQMapWX from '../../assets/qqmap-wx-jssdk.min.js';
import imgUrl from '../../assets/location.png';
import './index.scss';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 35.95234, // 纬度
      longitude: 120.239013, // 经度
      markers: [
        {
          // 标记点
          iconPath: imgUrl,
          id: 0, // 标记点 id marker 点击事件回调会返回此 id。建议为每个 marker 设置上 number 类型 id，保证更新 marker 时有更好的性能。
          latitude: 35.95234, // 纬度
          longitude: 120.239013, // 经度
          width: 16, // 标注图标高度
          height: 16, // 标注图标宽度
        },
      ],
      qMapKey: 'S32BZ-TYNL4-JDVUZ-XMLOV-DIIHS-WBF4J',
      QQMapSDK: {},
      nearbyBuilding: [],
      searchVal: '商场',
    };
  }

  componentDidMount = () => {
    // 实例化API核心类
    const QQMapSDK = new QQMapWX({
      key: 'S32BZ-TYNL4-JDVUZ-XMLOV-DIIHS-WBF4J',
      mapStyleId: 'style1', // 个性化地图
    });
    this.setState({
      QQMapSDK,
    });
    const that = this;
    Taro.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 获取周边建筑信息
        QQMapSDK.search({
          keyword: that.state.searchVal,
          boundary: `nearBy(${res.latitude},${res.longitude},1000)`,
          success: (searchRes) => {
            that.setState({
              nearbyBuilding: searchRes.data,
            });
          },
          fail: function (searchRes) {
            console.log(searchRes);
          },
          // complete: function(searchRes) {
          //   console.log(searchRes);
          // },
        });
        // 设置当前位置
        const obj = {
          // 标记点
          ...that.state.markers[0],
          latitude: res.latitude, // 纬度
          longitude: res.longitude, // 经度
        };
        that.setState({
          markers: [obj],
          latitude: res.latitude, // 纬度
          longitude: res.longitude, // 经度,
        });
      },
    });
  };

  /**
   * @desc 搜索框事件
   * @param { object } e
   */
  handleSearchValChange = (e) => {
    const that = this;
    this.state.QQMapSDK.search({
      keyword: e.detail.value,
      success: function (searchRes) {
        that.setState({
          nearbyBuilding: searchRes.data,
        });
      },
      fail: function (searchRes) {
        console.log(searchRes);
      },
      // complete: function(searchRes) {
      //   console.log(searchRes);
      // },
    });
    this.setState({
      searchVal: e.detail.value,
    });
  };

  /**
   * @desc 列表项点击事件
   * @param { number } latitude 纬度
   * @param { number } longitude 经度
   */
  handleNearbyClick = (latitude, longitude) => {
    // 设置当前位置
    const obj = {
      // 标记点
      ...this.state.markers[0],
      latitude: latitude, // 纬度
      longitude: longitude, // 经度
    };
    this.setState({
      markers: [obj],
      latitude: latitude, // 纬度
      longitude: longitude, // 经度,
    });
  };

  /**
   * @desc marker 点击事件
   * @param { object } e
   */
  handleMarkerClick = (e) => {
    console.log(e);
  };

  /**
   * @desc 视野发生变化触发事件
   * @param { object } e
   */
  handleRegionChange = (e) => {
    console.log(e);
  };
  render() {
    return (
      <View className="homeWrap">
        <View className="searchDom">
          <Input
            value={this.state.searchVal}
            onInput={this.handleSearchValChange.bind(this)}
            className="inputDom"
          />
        </View>

        {/**
         * longitude 中心经度
         * latitude 中心纬度
         * scale 缩放级别，取值范围为5-18
         * onMarkertap marker 点击事件
         * onRegionchange 视野发生变化触发事件
         * show-location 显示带有方向的当前定位点
         * cover-view 覆盖在原生组件之上的文本视图
         */}
        <Map
          class="mapDom"
          subkey={this.state.qMapKey}
          longitude={this.state.longitude}
          latitude={this.state.latitude}
          scale="18"
          markers={this.state.markers}
          onMarkertap={this.handleMarkerClick.bind(this)}
          onRegionchange={this.handleRegionChange.bind(this)}
          showLocation
        />

        <ScrollView className="scrollDom" scrollY scrollWithAnimation lowerThreshold="50">
          {this.state.nearbyBuilding.map((item) => (
            <View
              key={item.id}
              className="nearbyBuilding"
              onClick={this.handleNearbyClick.bind(this, item.location.lat, item.location.lng)}
            >
              <View className="nearbyTitle">{item.title}</View>
              <View className="nearbyAddr">{item.address}</View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Index;
