import React from 'react';
import { Text, View, Slider, Button, AsyncStorage } from 'react-native';
import { Icon, Text as RNEText, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import DatePicker from 'react-native-datepicker'

class NewsFilterModal extends React.Component {

  state = {
    start_date: '',
    end_date: ''
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: null,
      mode: 'modal'
    }
  }

  onClose = () => {
    this.props.navigation.goBack();
  }
  
  onApplyFilter = () => {
    const filter = { start_date, end_date } = this.state;
    
    if (this.parentHandleFilter) {
      this.parentHandleFilter(filter);
    }

    this.onClose();
  }

  componentDidMount = () => {
    this.parentHandleFilter = this.props.navigation.getParam("handleFilter", null);
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Icon style={{marginRight: 10}} name={'close'} onPress={this.onClose}/>
          <RNEText h3>Filter News</RNEText>
        </View>

        <View>
          <RNEText h4>
            From Date
          </RNEText>

          <DatePicker
            style={{width: 200}}
            date={this.state.start_date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2018-12-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({start_date: date})}}
          />
          
        </View>

        <View>
          <RNEText h4>
            To date
          </RNEText>

          <DatePicker
            style={{width: 200}}
            date={this.state.end_date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2018-12-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({end_date: date})}}
          />

        </View>

        <View style={styles.buttonContainer}>
          <Button title='Apply' onPress={ this.onApplyFilter } />
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff"
  },
  checkBoxStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  sliderThumbStyle: {
    borderWidth: 1,
    borderColor: 'red'
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "",
    justifyContent: ""
  },
  buttonContainer: {
    marginTop: 10
  }
}

export default connect(null, actions)(NewsFilterModal);
