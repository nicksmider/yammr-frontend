import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Text, Header, Input, Icon } from 'react-native-elements';
import { styles, style } from './Register.styles';
import { colors } from '../../config/theme';

class Register extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      visible: true,
    };

    this.viewPassword = this.viewPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.transparent,
      },
      headerBackImage: (
        <Icon type="ionicons" name="arrow-back" title="Info" size={28} />
      ),
      headerTransparent: true,
    };
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  viewPassword() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  _registerAsync = async () => {
    const { dispatch } = this.props.navigation;
    console.log('before dispatch');
    await dispatch(userActions.login(this.state.email, this.state.password));
    console.log('after dispatch');
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Register</Text>
        <View style={styles.inputContainer}>
          <Input
            label="EMAIL"
            labelStyle={style.labelStyle}
            placeholder="Email"
          />
          <Input
            placeholder="Password"
            labelStyle={style.labelStyle}
            label="PASSWORD"
            secureTextEntry={this.state.visible}
            rightIcon={
              <Icon
                type="font-awesome"
                name={this.state.visible ? 'eye' : 'eye-slash'}
                color={colors.secondary}
                onPress={this.viewPassword}
              />
            }
          />
        </View>
        <Button
          buttonStyle={style.registerButton}
          onPress={this._registerAsync}
          title="REGISTER"
        />
      </KeyboardAvoidingView>
    );
  }
}

export default Register;
