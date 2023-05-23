import { Floor } from "./floor";
import Light from "../light";
import { RigidBody } from "@react-three/rapier";
import { Title } from "../title";
import { Vector3 } from "three";

export function Level() {
	return (
		<>
			<Light />
			<Title text="Welcome citizen!" />
			<RigidBody type="fixed" restitution={0.2} friction={0}>
				<Floor position={new Vector3(0, -0.1, 0)} />
			</RigidBody>
		</>
	);
}
