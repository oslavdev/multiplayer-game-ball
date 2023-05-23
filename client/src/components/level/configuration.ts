import * as THREE from "three";

export const buildingBlocks = {
	floorMaterial: new THREE.MeshStandardMaterial({
		color: "#1d1f1e",
		metalness: 0,
		roughness: 0,
	}),
	wallMaterial: new THREE.MeshStandardMaterial({
		color: "#1d1f1e",
		metalness: 0,
		roughness: 0,
	}),
	boxGeometry: new THREE.BoxGeometry(1, 1, 1),
};
