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
	position: number[]
	quaternion: quaternion
}
