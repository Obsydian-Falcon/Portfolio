import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//  Listener for window getting resized
window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix() // Update camera maths

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Listener for entering/exiting fullscreen
window.addEventListener('dblclick', () => {
    
    // Works with everyone, including Safari
    const fullscreen_element = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreen_element)
    {
        if(canvas.requestFullscreen)
            canvas.requestFullscreen()
        else if(canvas.webkitRequestFullScreen)
            canvas.webkitRequestFullScreen()
    }
    else
    {
        if(document.exitFullscreen)
            document.exitFullscreen()    
        else if(document.webkitExitFullScreen)
            document.webkitExitFullScreen() 
    }

    // // Works for everyone but Safari
    // if(!document.fullscreenElement)
    //     canvas.requestFullscreen()
    // else
    //     document.exitFullscreen()
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