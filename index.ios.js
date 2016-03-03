/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AlertIOS,
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var ALL_REPORTS_REQUEST_URL = 'http://311api.cityofchicago.org/open311/v2/requests.json?service_code=4fd3b167e750846744000005'

class AwesomeProject extends Component {
// add some initial state
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount() {
      this.fetchAllReports();
  }
 fetchAllReports() {
   fetch(ALL_REPORTS_REQUEST_URL)
     .then((response) => response.json())
     .then((responseData) => {
       var dataObject = {};
       var length = responseData.length;
         dataObject = responseData;
       AlertIOS.alert(
              "fetch response",
              "thing2 -> " + length + ' ' + dataObject[0].lat
          )
   this.setState({
         dataSource : this.state.dataSource.cloneWithRows(dataObject),
         loaded: true,
       });
     })
     .done();
 }
 renderReport(report) {
  //console.warn('in renderReport report: ' + report );
   return (
     <View style={styles.container}>
      <View style={styles.rightContainer}>
       <Text style={styles.title}>{report.lat}</Text>
       </View>
     </View>
   );
 }
 renderLoadingView() {
  return (
    <View style={styles.container}>
      <Text>
        Loading data...
      </Text>
    </View>
  );
}
  render() {
  if (!this.state.loaded) {
    return this.renderLoadingView();
  }
  return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderReport}
        style={styles.listView}
      />
    );
  }
} // end of class AwesomeProject

var styles = StyleSheet.create({

  listView: {
     paddingTop: 20,
     backgroundColor: '#F5FCFF',
   },
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
