<template>
  <div class="hello">
    <div>
      <div id="div" :style="{width:width+'px',height:height+'px'}" style="overflow:hidden;"></div>
    </div>
  </div>
</template>

<script>
// import * as THREE from '../static/js/three.js'
var scene = new THREE.Scene();
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentPage: 0, // pdf文件页码
      width: window.innerWidth,
      height: window.innerHeight,
      bg: require('../static/1111.png')
    }
  },
  mounted() {
    this.init()
  },
  methods: {
      init(){
        var textureLoader = new THREE.TextureLoader();
        var group=new THREE.Group();
        var box=new THREE.SphereGeometry(300,300,300);


        var texture=textureLoader.load(this.bg);


        var material=new THREE.MeshPhongMaterial({
          map:texture,
          normalScale:new THREE.Vector2(1,1),
          transparent:true,
          opacity:0.6
        });

        this.createText('热', 330, 0, 0)

        this.createText('表', 0, 330, 0)

        this.createText('实', 0, 0, 350)

        this.createText('寒', -330, 0, 0)

        this.createText('理', 0, -330, 0)

        this.createText('虚', 0, 0, -330)

        var mesh=new THREE.Mesh(box,material);

        group.add(mesh);

        scene.add(group);
        var directionalLight=new THREE.DirectionalLight(16777215,0.9);

        directionalLight.position.set(400,200,300);

        scene.add(directionalLight);

        var directionalLight2=new THREE.DirectionalLight(16777215,0.9);

        directionalLight2.position.set(-400,-200,-300);

        scene.add(directionalLight2);

        var ambient=new THREE.AmbientLight(16777215,0.6);

        scene.add(ambient);

        var width=window.innerWidth;

        var height=window.innerHeight;

        var k=width/height;

        console.log(k)

        var s=700;

        var camera=new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000);

        // camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);


        camera.position.set(0,300,600);

        camera.lookAt(scene.position);

        var renderer=new THREE.WebGLRenderer({antialias:true});

        // renderer.setClearColor(0x808080);

        renderer.setSize(width,height);

        document.getElementById("div").appendChild(renderer.domElement);

        var linexcolor = "rgb(255, 255, 255)";
        var lineycolor = "rgb(255, 255, 255)";
        var linezcolor = "rgb(255, 255, 255)";
        this.initXYZ(renderer, scene, camera, 310,linexcolor,lineycolor,linezcolor);
        this.drawCube(scene, 60, -100, -40, 0, 'rgb(255,255,255)')

        function render(){
          renderer.render(scene,camera);
          requestAnimationFrame(render)
        }
        render();
        var controls=new THREE.OrbitControls(camera, renderer.domElement);

        // 使动画循环使用时阻尼或自转 意思是否有惯性

        // controls.enableDamping = true;

        //动态阻尼系数 就是鼠标拖拽旋转灵敏度

        //controls.dampingFactor = 0.25;

        //是否可以缩放

        controls.enableZoom = false;

        //是否自动旋转

        controls.autoRotate = false;

        //设置相机距离原点的最远距离

        controls.minDistance = 200;

        window.onresize=function(){
          renderer.setSize(window.innerWidth,window.innerHeight);
          k=window.innerWidth/window.innerHeight;
          camera.left=-s*k;
          camera.right=s*k;
          camera.top=s;
          camera.bottom=-s;
          camera.updateProjectionMatrix()
        };
      },
      createText(text, x, y, z) {
          var textLoader = new THREE.FontLoader()
          textLoader.load(
            '../../static/Benmo_Qianghei_Regular.json',
            function (font) {
              var options = {
                size: 30,
                height: 0,
                font: font, // “引用js字体必须换成英文”
                bevelThickness: 1,
                bevelSize: 1,
                bevelSegments: 1,
                curveSegments: 50,
                steps: 1
              }
              var textGeo = new THREE.TextGeometry(text, options);
              var textMesh = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial())
              textMesh.position.x = x;
              textMesh.position.y = y;
              textMesh.position.z = z;

              scene.add(textMesh);
            }
        );
      },
      initLine(scene,p1,p2,color){
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( {color: color,linewidth: 1} );
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        var line = new THREE.Line( geometry, material, THREE.LineSegments );
        scene.add(line);
      },
      drawCube(scene, x,y,z,r,color){
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
        this.initLine(scene,p1,p2,new THREE.Color( color ));
        this.initLine(scene,p2,p3,new THREE.Color( color ));
        this.initLine(scene,p3,p4,new THREE.Color( color ));
        this.initLine(scene,p1,p4,new THREE.Color( color ));
        this.initLine(scene,p5,p6,new THREE.Color( color ));
        this.initLine(scene,p6,p7,new THREE.Color( color ));
        this.initLine(scene,p7,p8,new THREE.Color( color ));
        this.initLine(scene,p5,p8,new THREE.Color( color ));
        this.initLine(scene,p1,p5,new THREE.Color( color ));
        this.initLine(scene,p3,p7,new THREE.Color( color ));
        this.initLine(scene,p2,p6,new THREE.Color( color ));
        this.initLine(scene,p4,p8,new THREE.Color( color ));
      },
      initXYZ(renderer, scene, camera, axisL,colorx,colory,colorz){
        //绘制X轴红色
        let arrow = 10
        this.initLine(scene,new THREE.Vector3( -axisL, 0, 0 ),new THREE.Vector3( axisL, 0, 0 ),new THREE.Color( colorx ));
        this.initLine(scene,new THREE.Vector3( axisL, 0, 0 ),new THREE.Vector3( axisL-arrow, arrow, 0 ),new THREE.Color( colorx ));
        this.initLine(scene,new THREE.Vector3( axisL, 0, 0 ),new THREE.Vector3( axisL-arrow, -arrow, 0 ),new THREE.Color( colorx ));
        //绘制Y轴绿色
        this.initLine(scene,new THREE.Vector3( 0, -axisL, 0 ),new THREE.Vector3( 0, axisL, 0 ),new THREE.Color( colory ));
        this.initLine(scene,new THREE.Vector3( 0, axisL, 0 ),new THREE.Vector3( arrow, axisL-arrow, 0 ),new THREE.Color( colory ));
        this.initLine(scene,new THREE.Vector3( 0, axisL, 0 ),new THREE.Vector3( -arrow, axisL-arrow, 0 ),new THREE.Color( colory ));
        //绘制Z轴蓝色，
        this.initLine(scene,new THREE.Vector3( 0, 0, -axisL ),new THREE.Vector3( 0, 0, axisL ),new THREE.Color( colorz ));
        this.initLine(scene,new THREE.Vector3( 0, 0, axisL ),new THREE.Vector3( 0, arrow, axisL-arrow ),new THREE.Color( colorz ));
        this.initLine(scene,new THREE.Vector3( 0, 0, axisL ),new THREE.Vector3( 0, -arrow, axisL-arrow ),new THREE.Color( colorz ));
        renderer.render(scene, camera);
      }

  }
}
</script>
<style scoped>
  * { touch-action: pan-y; }
</style>
