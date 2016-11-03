import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Navigator,
    Platform,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import NewsComponent from '../component/NewsComponent';
import LiveComponent from '../component/LiveComponent';
import TopicComponent from '../component/TopicComponent';
import MineComponent from '../component/MineComponent';
const config = require('../mainConfig.json').mainConfig;
const iosPlatform = Platform.OS;
const width = Dimensions.get('window').width;
var routeMapper = {
    LeftButton: (route, navigator, index, navState)=> {

        if (index != 0) {

            return (
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=> {
                        navigator.pop()
                    }}
                >

                    <Image
                        source={require('../img/back.png')}
                        style={styles.backImageStyle}
                    />

                </TouchableOpacity>
            );

        }

    },
    Title: (route, navigator, index, navState)=> {

        if (index == 0) {
            return (
                <Text style={styles.navgationBarTitleStyle}>{route.title}</Text>
            );
        } else {
            return (
                <Text style={styles.detailTitleStyle}>{route.title}</Text>
            );
        }


    },
    RightButton: (route, navigator, index, navState)=> {

    }
};

export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: config[0].selectedTab
        };
    }


    componentDidMount() {

    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={styles.tabBarStyle}
            >
                {this._renderTabItem(config[0].news, config[0].normalIconName, config[0].selectedIconName, config[0].selectedTab, config[0].news, NewsComponent, '网易新闻')}
                {this._renderTabItem(config[1].live, config[1].normalIconName, config[1].selectedIconName, config[1].selectedTab, config[1].news, LiveComponent, '花椒直播')}
                {this._renderTabItem(config[2].topic, config[2].normalIconName, config[2].selectedIconName, config[2].selectedTab, config[2].news, TopicComponent, '情感话题')}
                {this._renderTabItem(config[3].mine, config[3].normalIconName, config[3].selectedIconName, config[3].selectedTab, config[3].news, MineComponent, '个人设置')}
            </TabNavigator>
        );
    }

    _renderTabItem(title, iconName, selectedIconName, selectedTab, componentName, component, NavigationTitle) {
        return (
            <TabNavigator.Item
                title={title}
                renderIcon={() => <Image source={{uri: iconName}} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={{uri: selectedIconName}} style={styles.iconStyle}/>}
                onPress={() => this.setState({selectedTab: selectedTab})}
                selected={this.state.selectedTab == selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                titleStyle={styles.tabTitleStyle}
            >
                <Navigator
                    initialRoute={{name: componentName, component: component, title: NavigationTitle}}
                    configureScene={this._cofigureScene}
                    renderScene={this._renderScene}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBarContainer}
                            routeMapper={routeMapper}
                        />
                    }
                />
            </TabNavigator.Item>
        );
    }

    _cofigureScene(route, routeStack) {

        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }

    _renderScene(route, navigator) {
        return <route.component
            navigator={navigator}
            {...route.passProps}/>;
    }
}

const styles = StyleSheet.create({

    iconStyle: {
        width: iosPlatform == 'ios' ? 30 : 25,
        height: iosPlatform == 'ios' ? 30 : 25
    },
    selectedTitleStyle: {
        color: 'red'
    },
    tabTitleStyle: {
        fontSize: 12,
        color: 'white'
    },
    tabBarStyle: {
        backgroundColor: '#CCCCCC',
        height: 50
    },
    navBarContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navgationBarTitleStyle: {
        color: 'white',
        fontSize: 20,
        marginTop: 12,
        marginLeft: iosPlatform == 'ios' ? 0 : width / 5,
    },
    backImageStyle: {
        width: 20,
        height: 30,
        marginTop: 10,
        marginLeft: 10


    },
    detailTitleStyle: {
        color: 'white',
        fontSize: 15,
        marginTop: 15
    },
});
