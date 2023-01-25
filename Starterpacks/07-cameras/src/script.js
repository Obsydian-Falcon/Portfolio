import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Cursor
*/
const cursor = { 
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5 // Subtracting .5 means that our range is -0.5 to 0.5, giving us left and right/up and down
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspect_ratio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspect_ratio,
//      1 * aspect_ratio,
//      1,
//     -1,
//     0.1,
//     100
// ) // Boxy render, not a cone

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
// controls.update
// Damping, making the acceleration uniform
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // Allowing us to see all sides of the cube on the X plane
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // // Allowing use to see the top and bottom
    // camera.position.y = cursor.y * Math.PI * 5
    // camera.lookAt(mesh.position)

    // Update Controls
    controls.update()
   
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()