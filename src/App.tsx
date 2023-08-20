import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigator from "./components/navigators/Navigator";

import './App.css'
import { useMemo } from "react";
import NotFound from "./components/pages/NotFound";
import { RouteType } from "./components/navigators/Navigator";
import Advertisements from "./components/pages/Advertisements";
import AddAdvertisement from "./components/pages/AddAdvertisement";
import CodeType from "./model/CodeType";
import { useDispatch } from "react-redux";
import { Alert, Snackbar, ThemeProvider, createTheme } from "@mui/material";
import { codeActions } from "./redux/slices/codeSlice";
import routes from "./config/routes-config";
import SnackAlert from "./components/common/SnackAlert";
import BasicModal from "./components/common/BasicModal";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#FFBF76",
      light: '#FDECD9',
      dark: '#DD923C'
    },
    secondary: {
      main: "#ffffff",
      dark: "rgba(44,44,44,0.6)",

    },
  }
});

const App: React.FC = () => {

  return <ThemeProvider theme={defaultTheme}>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigator routes={routes} />}>
          <Route index element={<Advertisements />} />
          <Route path="/add" element={<AddAdvertisement />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      <SnackAlert autoHideDuration={5e3} />
      <BasicModal />
    </BrowserRouter>
  </ThemeProvider>
}
export default App;