import * as THREE from "three";

import { Float, Text } from "@react-three/drei";
import { animated, config, useSpring } from '@react-spring/three'

import { Vector3 } from "three";

const AnimatedText = animated(Text) as any


export function Title({ position = new Vector3(0, 0, 0), text = "Start" }) {

	const spring = useSpring({
		from: { position: [0.8, 0.2, 0], opacity: 0 },
		to: { position: [0.8, 0.75, 0], opacity: 1 },
		config: config.molasses,
	  })

	return (
		<group position={position}>
			<Float floatIntensity={0.4} rotationIntensity={0.25}>
				<AnimatedText
					{...spring}
					scale={0.5}
					maxWidth={0.25}
					lineHeight={0.75}
					textAlign="right"
					rotation-y={-0.25}
					outlineColor="red"
				>
					{text}
					<meshBasicMaterial toneMapped={false} />
				</AnimatedText>
			</Float>
		</group>
	);
}
