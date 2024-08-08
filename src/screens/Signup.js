import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {Input, Button} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import {SafeAreaView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled(LinearGradient).attrs(({theme}) => ({
  colors: [theme.gradientStart, theme.gradientEnd],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
}))`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({theme}) => theme.errorText};
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please enter your name.';
      } else if (!validateEmail(email)) {
        _errorMessage = 'Please verify your email.';
      } else if (password.length < 6) {
        _errorMessage = 'The password must contain 6 characters at least.';
      } else if (password !== passwordConfirm) {
        _errorMessage = 'Passwords need to match.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage),
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.flexOne}
        extraScrollHeight={20}>
        <Container>
          <Input
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder="Name"
            returnKeyType="next"
          />
          <Input
            ref={emailRef}
            label="Email"
            value={email}
            onChangeText={text => setEmail(removeWhitespace(text))}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="Email"
            returnKeyType="next"
          />
          <Input
            ref={passwordRef}
            label="Password"
            value={password}
            onChangeText={text => setPassword(removeWhitespace(text))}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="Password"
            returnKeyType="next"
            isPassword
          />
          <Input
            ref={passwordConfirmRef}
            label="Password Confirm"
            value={passwordConfirm}
            onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
            onSubmitEditing={_handleSignupButtonPress}
            placeholder="Password Confirm"
            returnKeyType="done"
            isPassword
          />
          <ErrorText>{errorMessage}</ErrorText>
          <Button
            title="Signup"
            onPress={_handleSignupButtonPress}
            disabled={disabled}
          />
        </Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

export default Signup;
