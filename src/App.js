import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/chat" element={<Chat />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
