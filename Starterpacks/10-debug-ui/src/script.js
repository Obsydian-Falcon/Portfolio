import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'; 

/**
 * Debug Panel 
 */
const gui = new GUI()

const params = {
    spin: () => 
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2}) // Rotate all the way around
    }
}

gui.add(params, 'spin')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debug: Adding the controls
// gui.add(mesh.position, 'y', -3, 3, .01) // Object property, property specifier
// gui.add(mesh.position, 'x', -3, 3, .01)
// gui.add(mesh.position, 'z', -3, 3, .01)

// Can also do this to change parameters like names
gui.add(mesh.position, 'x').min(-3).max(3).step(.01).name('X-transform')
gui.add(mesh.position, 'y').min(-3).max(3).step(.01).name('Y-transform')
gui.add(mesh.position, 'z').min(-3).max(3).step(.01).name('Z-transform')

// Adding a toggle for visibilty
gui.add(mesh, 'visible').name('Cube Visible')
gui.add(material, 'wireframe') // wireframe
gui.addColor(material, 'color')

// Other solution, might be needed for other projects
// Add to to gui area
// const params = {
//     color: 0xff0000
// }
// // Now we tweak the objects color, but need to tie it to the scene
// gui.addColor(params, 'color').onChange(() =>
// {
//     material.color.set(color)
// }) 

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()