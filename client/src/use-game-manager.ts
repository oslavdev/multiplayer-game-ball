import * as Types from './types'

import React from "react";
import { Vector3 } from "three";

export function useGameManager(socket: any) {

	const [name, setName] = React.useState<string>("");
	const [position, setPosition] = React.useState<Vector3>(new Vector3(0,0,0))
	const [id, setId] = React.useState<string | null>(null)

	const [isExperienceReady, setExperienceReadiness] =
		React.useState<boolean>(false);
	const [terminal, setTerminal ] = React.useState<Types.terminal[]>([])
	const [players, setPlayers] = React.useState<Types.Player[]>([])

	React.useEffect(() => {

		// new player has joined the room
		socket.on('updatePlayers', (data:{ players: Types.Player[]} ) =>{
			console.log(data)
			const filtered = data.players.filter((player) => player.playerId === id)
			console.log(filtered)
			console.log(id)
			setPlayers([...filtered])
		})

		// message was updated
		socket.on('message' , (data: {terminal: Types.terminal[]}) =>{
			setTerminal(data.terminal)
		})

		// Player has left the room
		socket.on("playerHasLeft", (data: {id: string}) =>{
			setPlayers((prevState) => {
				const filtered = prevState.filter((player) => player.playerId === data.id)
				return filtered
			} )
		})

		return () => socket.off('newPlayerJoined'); 
	}, [])


	function setReady(){
		setExperienceReadiness(true)
	}


	return {
		terminal,
		players,
		setReady,
		setId,
		ready: isExperienceReady,
		setName,
		name,
		setPosition,
		position
	};
}
