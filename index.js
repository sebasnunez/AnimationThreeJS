//Escena
const scene = new THREE.Scene();

//Camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;
camera.position.y = 8;
//renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



//Inicializar el loader
const loader = new THREE.GLTFLoader();

//Cargar Mesh
var mixers = [];
var clock = new THREE.Clock();
loader.load(
	// resource URL
	'./AlienSimpson.glb',
	// called when the resource is loaded
	function ( gltf ) {
        mixer = new THREE.AnimationMixer( gltf.scene );
        var action = mixer.clipAction( gltf.animations[ 0 ] );
        action.play();

        scene.add( gltf.scene );
		
	},
    // called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' + error);

	}
);
renderer.outputEncoding = THREE.sRGBEncoding;

//Stats
var stats;
stats = new Stats();
stats.setMode(2); // 0: fps, 1: ms, 2memory
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "100px";
stats.domElement.style.top = "10px";
document.getElementById("myStats").appendChild(stats.domElement);

//Luces
const light = new THREE.AmbientLight( 0xffffff, 1 );
light.position.set( 80, 100, 100 );
scene.add( light );

//Controls
controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
    renderer.render( scene, camera );
    controls.update();
    stats.update();
}
animate();

