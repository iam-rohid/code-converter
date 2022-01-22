import { Navigate, Route, Routes } from "react-router-dom";
import {
  HtmlToJsx,
  HtmlToPug,
  SvgToJsx,
  SvgToReactNative,
} from "./components/converters";
import { AppLayout } from "./components/layouts";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="svg-to-jsx" element={<SvgToJsx />} />
        <Route path="svg-to-react-native" element={<SvgToReactNative />} />
        <Route path="html-to-jsx" element={<HtmlToJsx />} />
        <Route path="html-to-pug" element={<HtmlToPug />} />
      </Route>
      <Route path="*" element={<Navigate to="svg-to-jsx" />} />
    </Routes>
  );
};

export default App;
