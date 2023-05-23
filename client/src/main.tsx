import "./styles/index.css";
import "./styles/App.css";

import { Socket, connect } from "socket.io-client";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const socket: Socket = connect(
	import.meta.env.VITE_SERVER_API || "http://localhost:7001",
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App socket={socket} />
	</React.StrictMode>,
);
