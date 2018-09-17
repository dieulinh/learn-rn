import React from 'react';
import { Text, View, Slider, Button, AsyncStorage } from 'react-native';
import { Icon, Text as RNEText, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ContactFilterModal extends React.Component {

  state = {
    is_male: true,
    from_age: 18,
    to_age: 30
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  onClose = () => {
    this.props.navigation.goBack();
  }
  
  onApplyFilter = () => {
    const filter = { is_male, from_age, to_age } = this.state;

    AsyncStorage.setItem("personal_contacts_filter", JSON.stringify(filter));
    
    if (this.parentHandleFilter) {
      this.parentHandleFilter(filter);
    }

    this.onClose();
  }

  loadStoredFilter = async () => {
    const filterStr = await AsyncStorage.getItem("personal_contacts_filter");
    let filter = null;
    try {
      filter = JSON.parse(filterStr);
    } catch (error) {}

    this.setState({...filter});
  }

  componentDidMount = () => {
    this.loadStoredFilter();

    this.parentHandleFilter = this.props.navigation.getParam("handleFilter", null);
  }

  onChangeGender = (is_male) => {
    this.setState({is_male})
  }
  
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Icon style={{marginRight: 10}} name={'close'} onPress={this.onClose}/>
          <RNEText h3>Filter contacts</RNEText>
        </View>

        <View>
          <RNEText h4>
            Gender
          </RNEText>

          <View style={styles.rowContainer}>
            <CheckBox
              containerStyle={styles.checkBoxStyle}
              title='Male'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.is_male}
              onPress={ () => this.onChangeGender(true) }
            />

            <CheckBox
              containerStyle={styles.checkBoxStyle}
              title='Female'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!this.state.is_male}
              onPress={ () => this.onChangeGender(false) }
            />

          </View>
        </View>

        <View>
          <RNEText h4>
            Age
          </RNEText>

          <View styles={styles.sliderContainer}>
            <Slider
              minimumValue={18}
              maximumValue={100}
              step={1}
              value={this.state.from_age}
              onValueChange={(from_age) => this.setState({from_age})} />
            <Text>From age: {this.state.from_age}</Text>
          </View>

          <View styles={styles.sliderContainer}>
            <Slider
              minimumValue={18}
              maximumValue={100}
              step={1}
              value={this.state.to_age}
              onValueChange={(to_age) => this.setState({to_age})} />
            <Text>To age: {this.state.to_age}</Text>
          </View>

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
  }
}

export default connect(null, actions)(ContactFilterModal);
