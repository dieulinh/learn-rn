import React from 'react';
import { Text, View, Slider, Button } from 'react-native';
import { Icon, Text as RNEText, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  FILTER_PERSONAL_CONTACT_CHANGED
} from '../actions/types';

class PersonalContactFilterModal extends React.Component {

  state = {
    isMale: true,
    fromAge: 18,
    toAge: 30
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  onClose = () => {
    const screen = this.props.navigation.goBack();
  }
  
  onApplyFilter = () => {
    const payload = {
      is_male: this.state.isMale,
      from_age: this.state.fromAge,
      to_age: this.state.toAge
    };

    this.props.changePersonalContactsFilter(payload);
    this.onClose();
  }

  componentWillReceiveProps(nextProps) {
    console.log("PersonalContactFilterModal componentWillReceiveProps", nextProps.filter);
  }

  onChangeGender = (isMale) => {
    this.setState({isMale})
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
              checked={this.state.isMale}
              onPress={ () => this.onChangeGender(true) }
            />

            <CheckBox
              containerStyle={styles.checkBoxStyle}
              title='Female'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!this.state.isMale}
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
              value={this.state.fromAge}
              onValueChange={(fromAge) => this.setState({fromAge})} />
            <Text>From age: {this.state.fromAge}</Text>
          </View>

          <View styles={styles.sliderContainer}>
            <Slider
              minimumValue={18}
              maximumValue={100}
              step={1}
              value={this.state.toAge}
              onValueChange={(toAge) => this.setState({toAge})} />
            <Text>To age: {this.state.toAge}</Text>
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

export default connect(null, actions)(PersonalContactFilterModal);
