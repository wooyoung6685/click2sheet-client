import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  SheetLink,
  TabList,
  TabItem,
  RemoveButton,
  ButtonGroup,
  LoadingBarWrapper,
  LoadingBar,
} from "./styles";

function App() {
  const [user, setUser] = useState(null);
  const [sheetUrl, setSheetUrl] = useState("");
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sheetTitle, setSheetTitle] = useState("");

  // Axios 인스턴스 생성 (토큰 포함)
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/user");
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setUser(null);
    setSheetUrl("");
  };

  const addTab = (tabName) => {
    if (!tabs.includes(tabName)) {
      setTabs([...tabs, tabName]);
    }
  };

  const removeTab = (tabName) => {
    setTabs(tabs.filter((tab) => tab !== tabName));
  };

  const handleCreateSheet = async () => {
    if (!user) return alert("로그인이 필요합니다!");
    setLoading(true);
    try {
      const res = await api.post("/create-sheet", {
        title: sheetTitle,
        tabs,
      });
      setSheetUrl(res.data.url);
    } catch (error) {
      console.error("Error creating sheet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>Google Sheets 생성기</h2>
      {user ? (
        <>
          <p>{user.name}님, 복사할 시트 탭을 선택하고 제목을 입력하세요.</p>
          <input
            type="text"
            placeholder="시트 제목을 입력하세요"
            value={sheetTitle}
            onChange={(e) => setSheetTitle(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              width: "40%",
              marginBottom: "1rem",
            }}
          />
          <Button onClick={() => addTab("계정정보[ID/PW]")}>
            계정정보[ID/PW] 탭 추가
          </Button>
          <Button onClick={() => addTab("Total")}>Total 탭 추가</Button>
          <Button onClick={() => addTab("SA_DAILY_네이버")}>
            SA_DAILY_네이버 탭 추가
          </Button>
          <Button onClick={() => addTab("SSA_DAILY_네이버")}>
            SSA_DAILY_네이버 탭 추가
          </Button>
          <Button onClick={() => addTab("SNS_DAILY_메타")}>
            SNS_DAILY_메타 탭 추가
          </Button>
          <Button onClick={() => addTab("DA_DAILY_ADN")}>
            DA_DAILY_ADN 탭 추가
          </Button>
          <Button onClick={() => addTab("카페24_DAILY_매출")}>
            카페24_DAILY_매출 탭 추가
          </Button>
          <Button onClick={() => addTab("스마트스토어_DAILY_매출")}>
            스마트스토어_DAILY_매출 탭 추가
          </Button>

          {tabs.length > 0 && (
            <TabList>
              <p>추가된 탭</p>
              {tabs.map((tab) => (
                <TabItem key={tab}>
                  {tab}
                  <RemoveButton onClick={() => removeTab(tab)}>×</RemoveButton>
                </TabItem>
              ))}
            </TabList>
          )}

          {loading && (
            <LoadingBarWrapper>
              <LoadingBar />
            </LoadingBarWrapper>
          )}

          <ButtonGroup>
            <Button onClick={handleCreateSheet} disabled={!sheetTitle}>
              시트 생성
            </Button>
            <Button onClick={handleLogout}>로그아웃</Button>
          </ButtonGroup>
        </>
      ) : (
        <Button onClick={handleLogin}>Google 로그인</Button>
      )}

      {sheetUrl && (
        <SheetLink href={sheetUrl} target="_blank">
          생성된 시트 열기
        </SheetLink>
      )}
    </Container>
  );
}

export default App;
