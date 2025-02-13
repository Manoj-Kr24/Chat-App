import "./App.css";
// import { Button } from "./components/ui/button";
import {
  // createBrowserRouter,
  // createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Homepage from "./pages/Homepage";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Homepage />}>
//       <Route path="" element={<ChatPage />} />
//     </Route>
//   )
// );

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
