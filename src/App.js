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

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });

  useEffect(() => {
    api
      .get("/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };

  const handleLogout = () => {
    api
      .post("/auth/logout", {}, { withCredentials: true }) // POST 요청으로 로그아웃 처리
      .then(() => {
        setUser(null);
        setSheetUrl("");
      })
      .catch((err) => {
        console.error("로그아웃 에러:", err);
        alert("로그아웃 실패. 다시 시도해 주세요.");
      });
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
    setLoading(true);
    try {
      const res = await api.post(
        "/create-sheet",
        { title: sheetTitle, tabs },
        { withCredentials: true }
      );
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
          <p>복사할 시트 탭을 선택하고, 제목을 입력하세요.</p>
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

          {/* 시트 생성 중 로딩바 */}
          {loading && (
            <LoadingBarWrapper>
              <LoadingBar />
            </LoadingBarWrapper>
          )}

          <ButtonGroup>
            {sheetTitle ? (
              <Button onClick={handleCreateSheet}>시트 생성</Button>
            ) : (
              <Button disabled onClick={handleCreateSheet}>
                시트 생성
              </Button>
            )}
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
