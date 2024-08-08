// Home.js
import React from 'react';
import styled from 'styled-components/native';
import {Button} from '../components'; // 필요한 경우 버튼 컴포넌트 추가

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Home = ({navigation}) => {
  return (
    <Container>
      <Button
        title="홈 화면"
        onPress={() => alert('홈 화면에 오신 것을 환영합니다!')}
      />
    </Container>
  );
};

export default Home;
