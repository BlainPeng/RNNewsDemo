import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    WebView
} from 'react-native';


export default class NewsDetailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detaileData: ''
        };
    }

    componentDidMount() {
        let detailUrl = 'http://c.3g.163.com/nc/article/' + this.props.rowData.docid + '/full.html';
        fetch(detailUrl).then((response)=>response.json()).then((jsonData)=> {

            console.log(jsonData);

            let data = jsonData[this.props.rowData.docid];

            let bodyHtml = data['body'];
            let imgArrLen = data['img'].length;
            for (var i = 0; i < imgArrLen; i++) {
                let img = data['img'][i];
                let imgSrc = img['src'];
                let imgHtml = '<img src="' + imgSrc + '" width="100%">';
                bodyHtml = bodyHtml.replace(img['ref'], imgHtml);

            }

            this.setState({
                detaileData: bodyHtml
            });

        }).catch((error)=> {
            alert('请求数据失败');
        });
    }

    render() {
        return (
            <WebView
                style={{marginTop: 70}}
                automaticallyAdjustContentInsets={true}
                source={{html: this.state.detaileData, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={this.state.scalesPageToFit}
            />


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});