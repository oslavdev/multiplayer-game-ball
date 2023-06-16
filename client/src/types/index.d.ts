import {Vector3 } from "@react-three/fiber";

export type terminal = {
	author: string 
	text: string
}

export type quaternion = {
	x: number
	y: number
	z: number
}

export type Player = {
	playerId: string
	playerName: string
	position: any
	quaternion: quaternion
}

export type game = {
	ready: boolean
	player: Player
	players: Player[]
	terminal: terminal[]
}
