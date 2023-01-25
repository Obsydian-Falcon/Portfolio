import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
const loading_manager = new THREE.LoadingManager()

// loading_manager.onStart = () =>
// {
//     console.log('onStart')
// }
// loading_manager.onProgress = () =>
// {
//     console.log('onProgress')
// }
// loading_manager.onError = () =>
// {
//     console.log('onError')
// }
// loading_manager.onLoad = () =>
// {
//     console.log('onLoad')
// }

const texture_loader = new THREE.TextureLoader(loading_manager)
const color_texture = texture_loader.load('/textures/minecraft.png')
const aplha_texture = texture_loader.load('/textures/door/alpha.jpg')
const height_texture = texture_loader.load('/textures/door/height.jpg')
const normal_texture = texture_loader.load('/textures/door/normal.jpg')
const ambientOcclusion_texture = texture_loader.load('/textures/door/ambientOcclusion.jpg')
const metal_texture = texture_loader.load('/textures/door/metalness.jpg')
const roughness_texture = texture_loader.load('/textures/door/roughness.jpg')

// color_texture.repeat.x = 2
// color_texture.repeat.y = 3
// color_texture.wrapS = THREE.RepeatWrapping
// color_texture.wrapT = THREE.RepeatWrapping

// color_texture.offset.x = 0.5

color_texture.rotation = Math.PI * 0.5
// color_texture.center.x = 0.5
// color_texture.center.y = 0.5

color_texture.generateMipmaps = false
color_texture.minFilter = THREE.NearestFilter
color_texture.magFilter = THREE.NearestFilter

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
const material = new THREE.MeshBasicMaterial({ map: color_texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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