#simple test of minispade
require('tester.js')

window.SOLAR =
  
 setSceneDimensions: () ->
    @width = 800
    @height = 600

  configureRenderSettings: (height, width) ->
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(@height, @width)
    return renderer
  
  obtainRenderNode: () ->
    #insert logic to check for an already existing domnode
    return $('#container')

  configureScene: () ->
    return new THREE.Scene()

  configureCamera: (scene, height, width) ->
    #viewangle, aspect, near, far
    camera = new THREE.PerspectiveCamera(45, height/width, 0.1, 10000)
    camera.position.z = 200
    return camera
    
  loadInitialElements: (scene) ->
    #PLACEHOLDER 
    radius = 50
    segments = 16
    rings = 16
    geometry = new THREE.SphereGeometry(radius, segments, rings)
    sphereMaterial = new THREE.MeshLambertMaterial
                      color: 0xBB2200
    sphere = new THREE.Mesh(geometry, sphereMaterial)
    scene.add(sphere)
  
  loadInitialLights: (scene) ->
    #PLACEHOLDER 
    pointLight = new THREE.PointLight(0xFFFFFF)
    pointLight.position.x = 10
    pointLight.position.y = 50
    pointLight.position.z = 100
    scene.add(pointLight)

  renderScene: (scene, renderer, camera) ->
    renderer.render(scene, camera)

  init: () ->
    @setSceneDimensions()
    @renderer = @configureRenderSettings(@height, @width)
    @domNode = @obtainRenderNode()
    @domNode.append(@renderer.domElement)
    #setup a new scene with any parameters desired
    @scene = @configureScene()
    #set the scene's default camera
    @camera = @configureCamera(@scene, @height, @width)
    #load initial elements from json
    @loadInitialElements(@scene)
    #load initial lights from json
    @loadInitialLights(@scene)
    #temp?
    @renderScene(@scene, @renderer, @camera)

SOLAR.init()
