/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

var MOCKED_REPORT_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'http://311api.cityofchicago.org/open311/v2/requests.json?service_code=4fd3b167e750846744000005'

class AwesomeProject extends Component {
// add some initial state
  constructor(props) {
    super(props);
    this.state = {
      reports: null,
    };
  }
  componentDidMount() {
      this.fetchData();
  }
  fetchData() {
   fetch(REQUEST_URL)
     .then((response) => response.json())
     .then((responseData) => {
       this.setState({
         reports: responseData,
       });
     })
     .done();
 }

  render() {
  var reports = MOCKED_REPORT_DATA[0];

  //console.warn(this.state.reports);


  return (
    <View style={styles.container}>
      <Image
        source={{uri: reports.posters.thumbnail}}
        style={styles.thumbnail}
      />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{reports.title}</Text>
          <Text style={styles.year}>{reports.year}</Text>
        </View>
      </View>
    );
  }
} // end of class AwesomeProject

var styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
    title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
