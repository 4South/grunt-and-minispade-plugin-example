minispade.register('solar.js', function() {
minispade.require('tester.js');

window.SOLAR = {
  setSceneDimensions: function() {
    this.width = 800;
    return this.height = 600;
  },
  configureRenderSettings: function(height, width) {
    var renderer;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.height, this.width);
    return renderer;
  },
  obtainRenderNode: function() {
    return $('#container');
  },
  configureScene: function() {
    return new THREE.Scene();
  },
  configureCamera: function(scene, height, width) {
    var camera;
    camera = new THREE.PerspectiveCamera(45, height / width, 0.1, 10000);
    camera.position.z = 200;
    return camera;
  },
  loadInitialElements: function(scene) {
    var geometry, radius, rings, segments, sphere, sphereMaterial;
    radius = 50;
    segments = 16;
    rings = 16;
    geometry = new THREE.SphereGeometry(radius, segments, rings);
    sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xBB2200
    });
    sphere = new THREE.Mesh(geometry, sphereMaterial);
    return scene.add(sphere);
  },
  loadInitialLights: function(scene) {
    var pointLight;
    pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 100;
    return scene.add(pointLight);
  },
  renderScene: function(scene, renderer, camera) {
    return renderer.render(scene, camera);
  },
  init: function() {
    this.setSceneDimensions();
    this.renderer = this.configureRenderSettings(this.height, this.width);
    this.domNode = this.obtainRenderNode();
    this.domNode.append(this.renderer.domElement);
    this.scene = this.configureScene();
    this.camera = this.configureCamera(this.scene, this.height, this.width);
    this.loadInitialElements(this.scene);
    this.loadInitialLights(this.scene);
    return this.renderScene(this.scene, this.renderer, this.camera);
  }
};

SOLAR.init();
});

minispade.register('tester.js', function() {

window.tester = "tester is here";
});
