import React, { useState } from 'react';
import styled from 'styled-components';
import '../../../asset/sass/pages/loginPage/nicknamePage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Back from '../../../asset/image/back.svg';

const StyledNicknamePage = styled.div`
  position: relative;
  height: 100vh;
  background-color: #ffffff;
`;

const NicknameContainer = styled.div`
  margin: 2% 0% -2% 0%;
`;

const CustomInput = styled.input`
  border: none;
  border-bottom: 2px solid #d9d9d9;
  width: calc(80% - 27px);
  padding: 8px;
  margin: 5% 0% 0% 10%;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #d9d9d9;
  }

  &:focus {
    &::placeholder {
      color: #474646;
    }
    border-bottom-color: black;
    border-bottom: 2px solid black;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 9% 0% -6.5% 10%;
  border-bottom: 2px solid #d9d9d9;
  width: calc(80% - 25px);
  padding: 2%;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-left: 1%;
  font-size: 1rem;
  cursor: pointer;
  letter-spacing: -1px;

  color: #000;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 7px;
  width: 20px;
  height: 20px;
  color: ${(props) => (props.checked ? '#22932D' : '#d9d9d9')};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StartButton = styled.button`
  background-color: #ff8d1d;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 1rem;
  letter-spacing: 0.5px;
  font-weight: 800;
  cursor: pointer;
  margin: 25% 0% 0% 65%;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: #d36f0c;
  }
`;

function NicknamePage() {
  const [isJobSeeking, setIsJobSeeking] = useState(false);
  const [isEmployed, setIsEmployed] = useState(false);

  const handleJobSeekingChange = () => {
    setIsJobSeeking(!isJobSeeking);
    setIsEmployed(false);
  };

  const handleEmployedChange = () => {
    setIsEmployed(!isEmployed);
    setIsJobSeeking(false);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <StyledNicknamePage className="main-page-container">
        <div className="nickname">
          <img className="back" src={Back} onClick={handleGoBack} />
          회원 정보 설정{' '}
        </div>

        <div className="nickname-info">
          <span className="welcome-nickname">
            원하는 닉네임을 <br /> 입력해 주세요
          </span>
        </div>

        <NicknameContainer>
          <CustomInput type="text" placeholder="닉네임을 입력하세요" />
        </NicknameContainer>

        <div className="nickname-info">
          <span className="welcome-nickname">
            현재 본인의 상황을 <br /> 체크해주세요
          </span>
        </div>

        <CheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            id="jobSeekingCheckbox"
            checked={isJobSeeking}
            onChange={handleJobSeekingChange}
          />
          <CheckboxLabel htmlFor="jobSeekingCheckbox" checked={isJobSeeking}>
            <Icon icon={faCircleCheck} checked={isJobSeeking} />
            취업 준비 중이에요
          </CheckboxLabel>
        </CheckboxContainer>

        <CheckboxContainer>
          <HiddenCheckbox
            type="checkbox"
            id="employedCheckbox"
            checked={isEmployed}
            onChange={handleEmployedChange}
          />
          <CheckboxLabel htmlFor="employedCheckbox" checked={isEmployed}>
            <Icon icon={faCircleCheck} checked={isEmployed} />
            직장을 다니고 있어요
          </CheckboxLabel>
        </CheckboxContainer>
        <StartButton>시작하기</StartButton>
      </StyledNicknamePage>
    </>
  );
}

export default NicknamePage;
