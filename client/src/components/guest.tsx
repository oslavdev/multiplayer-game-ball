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

export function Guest(props: IPlayer) {

	const body = useRef() as any
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
	const { rapier, world } = useRapier()
    const rapierWorld = world.raw()

	useFrame((state, delta) =>
    {
	
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

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
