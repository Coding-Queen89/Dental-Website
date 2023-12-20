import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.159.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.159.0/examples/jsm/loaders/GLTFLoader.js';

let heart = document.querySelector(".heart");

function model(set_model_directory,model_local_directory,perspectiveCamera,camera_y,a_light,a_light_op,p_light,p_light_op) {
    let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(perspectiveCamera,window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 40;
camera.position.y = camera_y
let renderer= new THREE.WebGLRenderer({alpha: true,antialias: true});
renderer.setClearColor(0xf0d98e,0);
renderer.setSize(1000,500);

renderer.domElement.setAttribute('id',"Model");
set_model_directory.appendChild(renderer.domElement, document.body.firstChild);

const directionalLight = new THREE.DirectionalLight(0xffffff);
        scene.add(directionalLight);

const aLight = new THREE.AmbientLight(a_light,a_light_op);
aLight.position.set(10,7,7);
scene.add(aLight);
const pLight = new THREE.PointLight(p_light,p_light_op);
pLight.position.set(10,50,70);
scene.add(pLight);

let loader = new GLTFLoader();
let obj = null;

loader.load(model_local_directory, function(gltf) {
    obj = gltf;
    obj.scene.scale.set(13,13,13);
    let mm = gsap.matchMedia();
    mm.add("(max-width: 601px)", () =>{
        renderer.setSize(window.outerWidth-120,500);
        obj.scene.scale.set(4,4,4);
    });
    scene.add(obj.scene);
}) ;


function animate(e) {
    requestAnimationFrame(animate);
    if(obj) {
        obj.scene.rotation.x = 0;
        $(window).scroll(function() {
            obj.scene.rotation.y = -window.scrollY / 100 - 100;
        })

        renderer.render(scene,camera);
    }
}

animate();
}

// Your Models, Your Settings

model(heart,'images/heart.glb',40,1,0xffffff,1);
