import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Debug Panel
 */
const gui = new GUI()

/**
 * Textures
 */
const texure_loader = new THREE.TextureLoader()

const cube_loader = new THREE.CubeTextureLoader()

const texture = texure_loader.load('/textures/door/color.jpg')
const alpha = texure_loader.load('/textures/door/alpha.jpg')
const ambient_occlusion = texure_loader.load('/textures/door/ambientOcclusion.jpg')
const height = texure_loader.load('/textures/door/height.jpg')
const metalness = texure_loader.load('/textures/door/metalness.jpg')
const normal= texure_loader.load('/textures/door/normal.jpg')
const roughness = texure_loader.load('/textures/door/roughness.jpg')
const gradient = texure_loader.load('/textures/gradients/3.jpg') // Gradient
const matcap = texure_loader.load('/textures/matcaps/8.png') // Matcap texture
gradient.minFilter = THREE.NearestFilter
gradient.magFilter = THREE.NearestFilter
gradient.generateMipmaps = false

const environment_map_texture = cube_loader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// material.map = texture
// material.color.set('purple')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = alpha
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcap
// material.flatShading = true

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 500
// material.specular = new THREE.Color('red')

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradient
// gradient.minFilter = THREE.NearestFilter
// gradient.magFilter = THREE.NearestFilter
// gradient.generateMipmaps = false

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environment_map_texture
// material.map = texture
// material.aoMap = ambient_occlusion
// material.aoMapIntensity = 1
// material.displacementMap = height
// material.displacementScale = 0.05
// material.metalnessMap = metalness
// material.roughnessMap = roughness
// material.normalMap = normal
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alpha


gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), material
)
sphere.position.x = -1.5

sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128), material
)
torus.position.x = 1.5
torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambient_light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambient_light)

const point_light = new THREE.PointLight(0xffffff, 0.5)
point_light.position.x = 2
point_light.position.y = 3
point_light.position.z = 4
scene.add(point_light)

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

    // Update Objects
    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1
    
    sphere.rotation.x = elapsedTime * 0.5
    plane.rotation.x = elapsedTime * 0.5
    torus.rotation.x = elapsedTime * 0.5

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()