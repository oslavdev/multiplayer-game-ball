import * as React from "react";

import Experience from "./components/experience";
import { Socket } from "socket.io-client";
import { Vector3 } from "three";
import { useGameManager } from "./use-game-manager";

type quaternion = {
	x: number
	y: number
	z: number
}

type terminal = {
	author: string
	text: string
}

type Player = {
	playerId: string
	playerName: string
	position: number[]
	quaternion: quaternion
}

type game = {
	ready: boolean
	player: Player
	players: Player[]
	terminal: terminal[]
}

function App({ socket }: { socket: Socket }) {

	const manager = useGameManager(socket) as any;
	
	React.useEffect(() => {
		socket.on("game", (game: game) =>{
			if(game.ready){
				manager.setPosition(new Vector3(...game.player.position))
				manager.setId(game.player.playerId)
				manager.setReady()
			}
		})
	}, [])

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault()

		manager.setName(e.target.value)
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
			<h3>Type your name to join free room</h3>
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
