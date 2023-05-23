import * as Types from '../types'

import { Canvas, useFrame } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import { Float, Text } from "@react-three/drei";
import { Vector, Vector3 } from "three";

import {Guest} from './guest'
import { KeyboardControls } from "@react-three/drei";
import { Level } from "./level/level";
import {Player} from './player'
import { useGameManager } from "../use-game-manager";

interface IGameInfo {
	info: Types.terminal[]
}

function GameInfo(props: IGameInfo){
	return(
		<div className="ui-block">
			{props.info.map((el, i) =>( 
				<div key={i} className="ui-row">
					<div className="ui-type">{el.author}</div>
					<div>{el.text}</div>
				</div>
			))}
		</div>
	)
}

interface Experience {
	name: string;
	socket: any;
	position: Vector3
	manager: any
}

export default function Experience(props: Experience) {
	

	return (
		<KeyboardControls
			map={[
				{ name: "forward", keys: ["ArrowUp", "KeyW"] },
				{ name: "backward", keys: ["ArrowDown", "KeyS"] },
				{ name: "leftward", keys: ["ArrowLeft", "KeyA"] },
				{ name: "rightward", keys: ["ArrowRight", "KeyD"] },
				{ name: "jump", keys: ["Space"] },
			]}
		>
			<Canvas
				shadows
				camera={{
					fov: 45,
					near: 0.1,
					far: 200,
					position: [2.5, 4, 6],
				}}
			>
				<Physics>
					<Player name={props.name} position={props.position} />
					{props.manager.players?.map((player: any) =>(
						<Guest key={player.playerId} name={player.name} position={player.position}  />
					))}
					<Level />
					{import.meta.env.VITE_DEBUG === "1" && <Debug />}
				</Physics>
			</Canvas>
			{props.manager.terminal && (
				<GameInfo info={props.manager.terminal}/>
			)}
		</KeyboardControls>
	);
}
