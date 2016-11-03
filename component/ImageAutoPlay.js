import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';

const width = Dimensions.get('window').width;
const DURATION = 2500;

export default class ImageAutoPlayComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            title: this.props.imgData[0].title
        };
    }

    render() {

        return (

            <View>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(scrollView)=>this.onAnimationEnd(scrollView)}
                    onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                >
                    {this._renderImage()}

                </ScrollView>

                <View style={styles.indicatorViewStyle}>
                    <Text style={styles.textIndicatorStyle}>{this.state.title}</Text>
                    <View style={styles.circelIndicatorStyle}>
                        {this._renderCircleIndicator()}
                    </View>

                </View>
            </View>
        );
    }

    componentDidMount() {
        this._startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _startTimer() {

        this.interval = setInterval(()=> {

            let activePage = 0;
            if (this.state.currentPage + 1 >= this.props.imgData.length) {
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }

            this.setState({
                currentPage: activePage,
                title: this.props.imgData[activePage].title
            });

            let offSetPosition = activePage * width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetPosition, y: 0, animated: true});

        }, DURATION);
    }

    _renderImage() {

        let imgArr = [];

        let imgData = this.props.imgData;
        for (var i in imgData) {
            let imgItemData = imgData[i];
            imgArr.push(
                <Image
                    key={i}
                    source={{uri: imgItemData.imgsrc}}
                    style={styles.imgStye}
                    resizeMode="cover"
                />
            );
        }


        return imgArr;

    }

    _renderCircleIndicator() {
        let circleArr = [];
        let style;
        let imgData = this.props.imgData;
        for (var i in imgData) {

            style = this.state.currentPage == i ? {color: 'red'} : {color: 'white'};
            circleArr.push(
                <Text key={i} style={[{fontSize: 25}, style]}>&bull;</Text>
            );
        }


        return circleArr;
    }

    onAnimationEnd(scrollView) {

        let offsetX = scrollView.nativeEvent.contentOffset.x;
        let currentPage = Math.floor((offsetX / width));
        // console.log('this.props.imgData[currentPage].title=' + this.props.imgData[currentPage].title);
        this.setState({
            currentPage: currentPage,
            // title: this.props.imgData[currentPage].title
        });

    }

    onScrollBeginDrag() {
        clearInterval(this.interval);
        console.log('onScrollBeginDrag');
    }

    onScrollEndDrag() {
        this._startTimer();
        console.log('onScrollEndDrag');
    }
}

const styles = StyleSheet.create({

    imgStye: {
        width: width,
        height: 150
    },
    indicatorViewStyle: {
        flexDirection: 'row',
        width: width,
        height: 25,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textIndicatorStyle: {
        color: 'white',
        fontSize: 12,
        marginLeft: 10
    },

    circelIndicatorStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10

    }


});