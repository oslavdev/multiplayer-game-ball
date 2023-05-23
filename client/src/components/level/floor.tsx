import * as Configuration from "./configuration";
import * as THREE from "three";

interface IFloor {
	position: THREE.Vector3;
}

export function Floor(props: IFloor) {
	const { buildingBlocks } = Configuration;

	return (
		<mesh
			geometry={buildingBlocks.boxGeometry}
			material={buildingBlocks.floorMaterial}
			position={props.position}
			scale={[50, 0.05, 50]}
			receiveShadow
		/>
	);
}
