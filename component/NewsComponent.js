import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ListView,
    TouchableOpacity,
    PixelRatio,
    Dimensions
} from 'react-native';

import ImageAutoPlayComponent from './ImageAutoPlay';
import NewsDetailComponent from './NewsDetailComponent';

const KEYWORD = 'T1348647909107';
const URL = 'http://c.3g.163.com/recommend/getSubDocPic?tid=' + KEYWORD + '&from=toutiao&size=20&prog=LMA1&offset=0&fn=1&passport=&devId=Y0tHHYzMPv0zawxP6c8j%2BA%3D%3D&lat=GIqqba1AQW0zfOlCQa%2BuVw%3D%3D&lon=LgVyfLmb3AoImbDNO6Xb3g%3D%3D&version=14.2&net=wifi&ts=1477124321&sign=lxcBOsKruQJJ0awLIrok47IHJok%2Bv%2F8TvgsQaj3orwJ48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=360sem_news&mac=9b3r3VxnJQZyKcxMTHZwI6hnYB%2BxK6YGLcdcZR%2BsrK8%3D';
const width = Dimensions.get('window').width;

export default class NewsComponent extends Component {


    constructor(props) {
        super(props);
        this.state = {
            autoPlayImgData: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 != r2})
        };
    }


    componentDidMount() {

        fetch(URL).then((response)=>response.json()).then((jsonData)=> {

            this._handleJsonData(jsonData[KEYWORD]);
            console.log(jsonData[KEYWORD]);

        }).catch((error)=> {
            //TODO 网络访问失败
        });

    }

    _handleJsonData(jsonData) {

        let imgData = [];
        let listViewData = [];

        for (var i = 0; i < jsonData.length; i++) {
            let dataItem = jsonData[i];
            if (dataItem.hasAD == 1) {
                //取出广告数据
                imgData = dataItem.ads;
            } else {
                listViewData.push(dataItem);
            }
        }

        this.setState({
            autoPlayImgData: imgData,
            dataSource: this.state.dataSource.cloneWithRows(listViewData)
        });

    }

    render() {
        return (
                <ListView
                    style={{marginTop: Platform.OS == 'ios' ? 64 : 56}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderHeader={this.renderHeader.bind(this)}
                />
        );
    }


    renderHeader() {
        if (this.state.autoPlayImgData.length == 0)return;

        return (
            <ImageAutoPlayComponent imgData={this.state.autoPlayImgData}/>
        );
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=>this._jumpToNewsDetail(rowData)}>

                <View style={styles.itemViewContainer}>
                    <Image source={{uri: rowData.imgsrc}}
                           style={styles.itemImgStyle}
                    />
                    <View style={styles.rightViewContainer}>
                        <Text style={styles.itemTitleStyle}>{rowData.title}</Text>
                        <Text style={styles.itemSubTitleStyle} numberOfLines={1}>{rowData.digest}</Text>
                        <Text style={styles.replyCountStyle}>{rowData.replyCount}跟贴</Text>
                        <Text style={styles.typeStyle}>{rowData.recSource == '#' ? '' : rowData.recSource}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    _jumpToNewsDetail(rowData) {
        this.props.navigator.push({
            component: NewsDetailComponent,
            title: rowData.title,
            passProps: {rowData}
        });
    }
}


const styles = StyleSheet.create({
    headContainer: {
        height: Platform.OS == 'ios' ? 70 : 50,
        backgroundColor: 'red',
        justifyContent: 'center',

    },

    itemViewContainer: {
        flexDirection: 'row',
        height: 100,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#e8e8e8',

    },

    rightViewContainer: {
        width: width * 0.75,
        marginLeft: 10,
        flex: 1
    },
    headTitle: {

        textAlign: 'center',
        marginTop: Platform.OS == 'ios' ? 25 : 0,
        fontSize: 20,
        color: 'white'

    },
    itemImgStyle: {
        width: 70,
        height: 70,
        marginLeft: 10,
        alignSelf: 'center'

    },

    itemTitleStyle: {
        fontSize: 15,
        color: 'black',
        marginBottom: 5,
        marginTop: 10
    },

    replyCountStyle: {
        position: 'absolute',
        right: 10,
        bottom: 3,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 3,
        color: 'gray',
        fontSize: 12
    },
    itemSubTitleStyle: {
        fontSize: 12,
        color: 'grey'
    },

    typeStyle: {
        position: 'absolute',
        bottom: 10,
        fontSize: 12,
        color: 'grey'

    }
});
