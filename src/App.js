import { useState } from "react";
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
	const [user, setUser] = useState(() => {
		const localStorageEpisodes = localStorage.getItem('USER-TELEGRAM');
		return localStorageEpisodes ? JSON.parse(localStorageEpisodes) : [];
	});
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/*" element={<Home setUser={setUser} />} />
			<Route path="/chat" element={<Chat setUser={setUser} user={user} />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
