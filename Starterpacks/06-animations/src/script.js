import * as THREE from 'three'
import gsap from  'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// let time = Date.now()

// // Animations
// // Tick: Each application of this function on a frame is a "tick", this runs  our animation loop
// const tick = () =>
// {
//     // Time
//     const currtime = Date.now()
//     const delta = currtime - time
//     time = currtime

//     console.log(delta)
//     //Update Objects
//     // mesh.position.x += .01
//     mesh.rotation.y += .001 * delta // Rotate at same speed, regardless of framerate


//     // Render
//     renderer.render(scene, camera)
    
//     // Call method.
//     window.requestAnimationFrame(tick)
// }
// tick() // Gotta call the function

// Using Clock
// const clock = new THREE.Clock()

/**
 * Using GSAP to change mesh position (tween), give it the mesh's 
 * position and an object. The object should contain the
 * duration, delay and x/y/z axis for change.
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

const tick = () =>
{
    // // Clocl
    // const elapsedTime = clock.getElapsedTime()
   
    // // Update Objects
    // mesh.rotation.y = elapsedTime * Math.PI * 2 // 1 revolution/sec
    // camera.position.y = Math.sin(elapsedTime) // Up and down
    // camera.position.x = Math.cos(elapsedTime) // Side to side (kinda)
    // camera.lookAt(mesh.position)

    // Render Scene
    renderer.render(scene, camera)

    // // Call method
    window.requestAnimationFrame(tick)
}
tick()

