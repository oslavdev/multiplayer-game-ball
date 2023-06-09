import { RigidBody, useRapier } from '@react-three/rapier'

import { Vector3 } from "three";
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef } from 'react'

interface IPlayer {
	name: string
    position: Vector3
}

export function Guest(props: IPlayer) {

	const body = useRef() as any
    
	useFrame((state, delta) =>
    {
	
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        // const impulseStrength = 0.6 * delta
        // const torqueStrength = 0.2 * delta

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)
	})

	 return( 
		 <>

	 <RigidBody
        ref={ body }
        colliders="ball"
        restitution={ 0.2 }
        friction={ 1 } 
        linearDamping={ 0.5 }
        angularDamping={ 0.5 }
        position={ props.position }
    >
        <mesh castShadow>
            <icosahedronGeometry args={ [ 0.3, 1 ] } />
            <meshStandardMaterial flatShading color="#2596be" />
        </mesh>
    </RigidBody>
	</>
	)
}
