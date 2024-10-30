import styled, { ThemeProvider } from "styled-components";
import { Navbar } from "./components/navbar/Navbar";
import { AppWrapper } from "./components/AppWrapper";
import { useUserStore } from "./store/userStore";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Footer } from "./components/footer/Footer";
import { SoundPlayer } from "./components/footer/sounds/SoundPlayer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { ProfilePage } from "./pages/ProfilePage";

import './styles/globals.css';
import { ProtectedRoute } from "./components/routes/ProtectedRoute";

const Main = styled.main`
  width: 100%;
  flex-grow: 1;
  background-color: ${props => props.theme.background};
`;

export const App = () => {

  const { themeSelected } = useUserStore(state => state);
  const { theme } = useLocalStorage();

  return (
    <AppWrapper>
			<BrowserRouter>
      <ThemeProvider theme={theme || themeSelected}>
          <Navbar />
          <Main>
            <Routes>
              <Route path="/" element={<GamePage/>} />
              <Route element={<ProtectedRoute/> }>
								<Route path="profile" element={<ProfilePage/>} />
							</Route>
              <Route path="/*" element={<GamePage/>} />
            </Routes>
          </Main>
          <Footer/>
          <SoundPlayer/>
      </ThemeProvider>
    </BrowserRouter>
		</AppWrapper>
  )
}