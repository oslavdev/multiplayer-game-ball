import * as React from "react";

import Experience from "./components/experience";
import { Socket } from "socket.io-client";
import { useGameManager } from "./use-game-manager";

function App({ socket }: { socket: Socket }) {

	const manager = useGameManager(socket) as any;
	
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault()

		manager.handleName(e.target.value)
	}

	function onSubmit() {
		socket.emit("joinRoom", {
			name: manager.name
		});
	}

	if (manager.ready) {
		return <Experience manager={manager} position={manager.position} socket={socket} name={manager.name} />;
	}

	return (
		<div className="App">
			<h3>Type your name to join a free room</h3>
			<input onChange={handleChange} />
			<div className="pt-20">
				<button
					onClick={onSubmit}
					disabled={!manager.name}
					className={`button ${!manager.name ? "inactive" : ""}`}
				>
					Start
				</button>
			</div>
		</div>
	);
}

export default App;
