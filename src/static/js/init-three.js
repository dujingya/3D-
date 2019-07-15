var renderer,
	camera,
	width,
	height,
	scene,
	light,
	sceneRotation = {},
	mousePos = {};
function initThree() {
    width = document.getElementById("div").clientWidth;
    height = document.getElementById("div").clientHeight;
    renderer = new THREE.WebGLRenderer({antialias : true,alpha : true});
    renderer.setSize(width, height);
    document.getElementById("div").appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 0.0); //设置stage背景色透明，看到后面的html内容
}
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2000;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({x : 0,y : 0,z : 0});
}
function initScene() {
    scene = new THREE.Scene();
}
function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(0, 0, 500);
    scene.add(light);
}
function initLine(scene,p1,p2,color){
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( {color: color,linewidth: 1} );
	geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    var line = new THREE.Line( geometry, material, THREE.LineSegments );
    scene.add(line);
}
//绘制一个正方体，通过绘制所有边
function drawCube(scene, x,y,z,r,color){
	let x2 = x/2
	let y2 = y/2
	let z2 = z/2
	var p1 = new THREE.Vector3( (x2 + x2),(y2 + y2),(z2 + z2) );
	var p2 = new THREE.Vector3( (x2 + x2),(y2 + y2),(z2 - z2) );
	var p3 = new THREE.Vector3( (x2 - x2),(y2 + y2),(z2 - z2) );
	var p4 = new THREE.Vector3( (x2 - x2),(y2 + y2),(z2 + z2) );
	var p5 = new THREE.Vector3( (x2 + x2),(y2 - y2),(z2 + z2) );
	var p6 = new THREE.Vector3( (x2 + x2),(y2 - y2),(z2 - z2) );
	var p7 = new THREE.Vector3( (x2 - x2),(y2 - y2),(z2 - z2) );
	var p8 = new THREE.Vector3( (x2 - x2),(y2 - y2),(z2 + z2) );
	initLine(scene,p1,p2,new THREE.Color( color ));
	initLine(scene,p2,p3,new THREE.Color( color ));
	initLine(scene,p3,p4,new THREE.Color( color ));
	initLine(scene,p1,p4,new THREE.Color( color ));
	initLine(scene,p5,p6,new THREE.Color( color ));
	initLine(scene,p6,p7,new THREE.Color( color ));
	initLine(scene,p7,p8,new THREE.Color( color ));
	initLine(scene,p5,p8,new THREE.Color( color ));
	initLine(scene,p1,p5,new THREE.Color( color ));
	initLine(scene,p3,p7,new THREE.Color( color ));
	initLine(scene,p2,p6,new THREE.Color( color ));
	initLine(scene,p4,p8,new THREE.Color( color ));
}
function  initXYZ(renderer, axisL,colorx,colory,colorz){
	//绘制X轴红色
	let arrow = 10
	initLine(scene,new THREE.Vector3( -axisL, 0, 0 ),new THREE.Vector3( axisL, 0, 0 ),new THREE.Color( colorx ));
	initLine(scene,new THREE.Vector3( axisL, 0, 0 ),new THREE.Vector3( axisL-arrow, arrow, 0 ),new THREE.Color( colorx ));
	initLine(scene,new THREE.Vector3( axisL, 0, 0 ),new THREE.Vector3( axisL-arrow, -arrow, 0 ),new THREE.Color( colorx ));
	//绘制Y轴绿色
	initLine(scene,new THREE.Vector3( 0, -axisL, 0 ),new THREE.Vector3( 0, axisL, 0 ),new THREE.Color( colory ));
	initLine(scene,new THREE.Vector3( 0, axisL, 0 ),new THREE.Vector3( arrow, axisL-arrow, 0 ),new THREE.Color( colory ));
	initLine(scene,new THREE.Vector3( 0, axisL, 0 ),new THREE.Vector3( -arrow, axisL-arrow, 0 ),new THREE.Color( colory ));
	//绘制Z轴蓝色，
	initLine(scene,new THREE.Vector3( 0, 0, -axisL ),new THREE.Vector3( 0, 0, axisL ),new THREE.Color( colorz ));
	initLine(scene,new THREE.Vector3( 0, 0, axisL ),new THREE.Vector3( 0, arrow, axisL-arrow ),new THREE.Color( colorz ));
	initLine(scene,new THREE.Vector3( 0, 0, axisL ),new THREE.Vector3( 0, -arrow, axisL-arrow ),new THREE.Color( colorz ));
	renderer.render(scene, camera);
}
function scrollScene(){
	setTimeout(() => {
		var elm = document.getElementById("div");
		elm.addEventListener("mousedown",function(e){
			mousePos.x = e.clientX;
			mousePos.y = e.clientY;
			sceneRotation.x = scene.rotation.x;
			sceneRotation.y = scene.rotation.y;
			elm.addEventListener("mousemove",mouseMoveHandler);
		});
		elm.addEventListener("mouseup",function(e){
			elm.removeEventListener("mousemove",mouseMoveHandler);
		});
	}, 1000)
}
function mouseMoveHandler(e){
	var dx = e.clientX - mousePos.x;
	var dy = e.clientY - mousePos.y;
	scene.rotation.x = sceneRotation.x - dy / 100;
	scene.rotation.y = sceneRotation.y + dx / 100;
	renderer.render(scene, camera);
}
!(function init(){
	// initThree();
	// initCamera();
	// initScene();
	// initLight();
	// scrollScene();
	// renderer.render(scene, camera);
})();

