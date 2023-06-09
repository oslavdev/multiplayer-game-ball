import * as React from "react";
import * as THREE from 'three'

import { Float, Text } from "@react-three/drei";
import { RigidBody, useRapier } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'

import { Vector3 } from "three";
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'

interface IPlayer {
	name: string
    position: Vector3
}

export function Player(props: IPlayer) {

	const body = useRef() as any
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
	const { rapier, world } = useRapier()
    const rapierWorld = world.raw()
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10))
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3())

	useFrame((state, delta) =>
    {
		const { forward, backward, leftward, rightward } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

		if(forward)
        {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if(rightward)
        {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        if(backward)
        {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        
        if(leftward)
        {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)

		 /**
         * Camera
         */
		  const bodyPosition = body.current.translation()
    
		  const cameraPosition = new THREE.Vector3()
		  cameraPosition.copy(bodyPosition)
		  cameraPosition.z += 3.25
		  cameraPosition.y += 2.35
  
		  const cameraTarget = new THREE.Vector3()
		  cameraTarget.copy(bodyPosition)
		  cameraTarget.y += 0.25
  
		  smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
		  smoothedCameraTarget.lerp(cameraTarget, 5 * delta)
  
		  state.camera.position.copy(smoothedCameraPosition)
		  state.camera.lookAt(cameraTarget)
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
