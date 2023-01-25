import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
const axis_helper = new THREE.AxesHelper()
scene.add(axis_helper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcap = textureLoader.load('/textures/matcaps/8.png')

/**
 * Font
 */
const font_loader = new FontLoader()

font_loader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const text_geometry = new TextGeometry(
        'Hello Threejs',
         {
            font: font, 
            size: 0.5,
            height: 0.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        })
        // Offset bevel with -0.2 on the x and y
        // This is the hard way
        // text_geometry.translate(
        //     - (text_geometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (text_geometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (text_geometry.boundingBox.max.z - 0.3) * 0.5
        // )
        text_geometry.center()

        const material = new THREE.MeshMatcapMaterial()
        material.matcap = matcap
        const text = new THREE.Mesh(text_geometry, material)
        scene.add(text)
        
        // console.time('donuts')

        const donut_geometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        for(let i = 0; i < 500; i++)
        {
            // Create donut
            const donut = new THREE.Mesh(donut_geometry, material)

            // Randomize position
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            
            // Radnom Rotation
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            // Random size
            const scale = Math.random()
            donut.scale.set(scale,scale,scale)
            scene.add(donut)
        }
        // console.timeEnd('donuts')
    }
)
/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// cube.position.x = -1
// scene.add(cube)

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
camera.position.z = 2
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