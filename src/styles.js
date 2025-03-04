import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(37, 117, 252, 0.4);
  }
`;

export const SheetLink = styled.a`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #2575fc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// TabList를 2열 그리드로 변경
export const TabList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
  margin: 1rem 0;
  p {
    grid-column: span 2;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
`;

export const TabItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 0.95rem;
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4d4f;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: #ff7875;
  }
`;

// 탭 리스트와 시트 생성/로그아웃 버튼 사이에 구분선을 위한 버튼 그룹
export const ButtonGroup = styled.div`
  width: 100%;
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

// 로딩바 애니메이션 정의
const loadingAnimation = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

export const LoadingBarWrapper = styled.div`
  width: 100%;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
  margin: 1rem 0;
`;

export const LoadingBar = styled.div`
  width: 50%;
  height: 8px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border-radius: 20px;
  animation: ${loadingAnimation} 1.5s ease-in-out infinite;
`;
