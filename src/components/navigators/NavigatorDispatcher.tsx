import { RouteType } from "./Navigator";
import Navigator from "./Navigator";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NavigatorPortrait from "./NavigatorPortrait";



const NavigatorDispatcher: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));

  return isPortrait ? <NavigatorPortrait routes={routes} /> : <Navigator routes={routes} />
}

export default NavigatorDispatcher