import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {Input, Button} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';
import {SafeAreaView, StyleSheet, Alert} from 'react-native'; // Alert 추가
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native'; // useNavigation 훅 추가

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
  const navigation = useNavigation(); // useNavigation 훅 사용
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [birthdate, setBirthdate] = useState(''); // 생년월일 상태 추가
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const birthdateRef = useRef(); // 생년월일 ref 추가
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = '이름을 입력해주세요.';
      } else if (!validateEmail(email)) {
        _errorMessage = '이메일을 확인해 주세요.';
      } else if (password.length < 6) {
        _errorMessage = '비밀번호는 최소 6자리 이상이어야 합니다';
      } else if (password !== passwordConfirm) {
        _errorMessage = '비밀번호가 일치해야 합니다.';
      } else if (!birthdate) {
        // 생년월일 확인 추가
        _errorMessage = '생년월일을 입력해주세요.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm, birthdate]); // 생년월일 추가

  useEffect(() => {
    setDisabled(
      !(
        name &&
        email &&
        password &&
        passwordConfirm &&
        birthdate &&
        !errorMessage
      ),
    );
  }, [name, email, password, passwordConfirm, birthdate, errorMessage]); // 생년월일 추가

  const _handleSignupButtonPress = () => {
    // 회원가입 로직 추가 (예: API 호출)

    // 회원가입이 성공했다고 가정하고 메시지 표시
    Alert.alert('가입이 완료되었습니다.', '로그인 화면으로 이동합니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('Login'), // 로그인 화면으로 이동
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.flexOne}
        extraScrollHeight={20}>
        <Container>
          <Input
            label="이름"
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={() => birthdateRef.current.focus()} // 생년월일 입력으로 포커스 이동
            placeholder="이름"
            returnKeyType="next"
          />
          <Input
            ref={birthdateRef}
            label="생년월일"
            value={birthdate}
            onChangeText={text => setBirthdate(text)}
            onSubmitEditing={() => emailRef.current.focus()} // 이메일 입력으로 포커스 이동
            placeholder="YYYY-MM-DD"
            returnKeyType="next"
            keyboardType="numeric" // 숫자 키보드 활성화
          />
          <Input
            ref={emailRef}
            label="Email"
            value={email}
            onChangeText={text => setEmail(removeWhitespace(text))}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="example@gmail.com"
            returnKeyType="next"
          />
          <Input
            ref={passwordRef}
            label="비밀번호"
            value={password}
            onChangeText={text => setPassword(removeWhitespace(text))}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="비밀번호"
            returnKeyType="next"
            isPassword
          />
          <Input
            ref={passwordConfirmRef}
            label="비밀번호 확인"
            value={passwordConfirm}
            onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
            onSubmitEditing={_handleSignupButtonPress}
            placeholder="비밀번호 확인"
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
