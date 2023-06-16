import * as Types from './types'

import React from "react";
import { Vector3 } from "three";

export function useGameManager(socket: any) {

	const [name, setName] = React.useState<string>("");

	const [currentPlayer, setCurrentPlayer] = React.useState<Types.Player>({
		position: new Vector3(0,0,0)
	})

	const [isExperienceReady, setExperienceReadiness] =
		React.useState<boolean>(false);

	const [terminal, setTerminal ] = React.useState<Types.terminal[]>([])
	const [players, setPlayers] = React.useState<Types.Player[]>([])

	React.useEffect(() => {

		// new player has joined the room
		socket.on('updatePlayers', (data:{ players: Types.Player[]} ) =>{
			setPlayers([...data.players])
		})

		// message was updated
		socket.on('message' , (data: {terminal: Types.terminal[]}) =>{
			setTerminal(data.terminal)
		})

		// player has left the room
		socket.on("playerHasLeft", (data: {id: string}) =>{
			setPlayers((prevState) => {
				const filtered = prevState.filter((player) => player.playerId === data.id)
				return filtered
			} )
		})

		// start the game
		socket.on("game", (game: Types.game) =>{
			if(game.ready){
				setCurrentPlayer(game.player)
				setPlayers([...game.players])
				setExperienceReadiness(true)
			}
		})

		return () => socket.off('newPlayerJoined'); 
	}, [])

	function handleName(name: string){
		setName(name)
	}

	return {
		terminal,
		players,
		ready: isExperienceReady,
		handleName,
		name,
		position: currentPlayer.position,
		currentPlayer
	};
}
