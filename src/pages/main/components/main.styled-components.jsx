import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  flex-direction: column;
  margin: 24px auto;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: 480px;
  background-color: #2c2f33;
  border-radius: 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  ${({ dragOver }) => dragOver && 'background-color: #99aab5;'}
`;

export const ItemContainer = styled.div`
  display: flex;
  padding: 16px;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  background-color: #23272a;
  border-radius: 8px;

  p {
    margin: 4px;
    font-size: 14px;
  }
`;

export const UploadButton = styled.label`
  display: flex;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 16px;
  border: 2px solid #99aab5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #7289da;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  font-size: 16px;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 16px;
  border: 2px solid #99aab5;
  border-radius: 8px;
  background-color: #7289da;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #99aab5;
  }

  &:disabled {
    background-color: #99aab5;
    cursor: default;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 16px;
`;

export const SuccessMessage = styled(Message)`
  color: #43b581;
`;

export const ErrorMessage = styled(Message)`
  color: #f04747;
`;

export const Spinner = styled.div`
  &.main-spinner {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  &.main-spinner div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: main-spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &.main-spinner div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes main-spinner {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;
