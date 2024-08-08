import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {Image, Input, Button} from '../components';
import {images} from '../utils/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
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

const Login = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = value => {
    const changedEmail = removeWhitespace(value);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.',
    );
  };

  const handlePasswordChange = value => {
    setPassword(removeWhitespace(value));
  };

  const handleLoginButtonPress = () => {
    // 로그인 로직을 추가하세요.

    // 로그인 성공 후 홈 화면으로 이동
    navigation.navigate('Home'); // 홈 화면으로 이동
  };

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.flexOne}
      extraScrollHeight={20}>
      <Container insets={insets}>
        <Image url={images.logo} imageStyle={styles.imageStyle} rounded />
        <Input
          label="이메일"
          value={email}
          onChangeText={handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="example@gmail.com"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="비밀번호"
          value={password}
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleLoginButtonPress}
          placeholder="비밀번호"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="로그인"
          onPress={handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  imageStyle: {
    borderRadius: 8,
  },
});

export default Login;
