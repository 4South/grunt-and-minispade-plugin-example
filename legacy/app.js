var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

var $container = $('#container');

var renderer = new THREE.WebGLRenderer();

var camera = new THREE.PerspectiveCamera (
                                            VIEW_ANGLE,
                                            ASPECT,
                                            NEAR,
                                            FAR    );


var scene = new THREE.Scene();

scene.add(camera);

camera.position.z = 200;

renderer.setSize(WIDTH, HEIGHT);

$container.append(renderer.domElement);

sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xBB2200,    
});

var radius = 50,
    segments = 16,
    rings = 16;

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    radius,
    segments,
    rings),
  sphereMaterial);

scene.add(sphere);

var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 100;



scene.add(pointLight);


renderer.render(scene, camera);
