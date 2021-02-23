import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  LineBasicMaterial,
  CircleGeometry,
  MeshBasicMaterial,
  LineLoop,
  Mesh,
  Raycaster,
  Vector2,
  AmbientLight,
  PointLight,
  TextureLoader,
} from './../Earth/three.module.js'

import {
  Interaction
} from './../Earth/three.interaction.module.js'

export class Sun {
  constructor(selector, props) {
    const st = document.querySelector(selector)
    const sb = st.getBoundingClientRect()
    this.props = {
      selector,
      ...props
    }
    this.font = null
    this.fallback = props.fallback
    this.mouseFallback = props.mouseFallback
    this.done = props.done
    this.last = 0
    this.container = {
      el: st,
      width: sb.width,
      height: sb.height,
      left: sb.left,
      top: sb.top,
    }
    this.init()
    this.render.render(this.scene, this.camera);
    this.interaction = new Interaction(this.render, this.scene, this.camera);
    const sun = document.querySelector('.s-w')
    sun.addEventListener('mouseover', () => {
      cancelAnimationFrame(this.ani)
    })
    sun.addEventListener('mouseout', () => {
      this.ani = requestAnimationFrame(this.circleMove.bind(this))
    })
  }

  init() {
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();
    this.render = this.initRender(this.container)
    this.camera = this.initCamera(this.container)
    this.scene = this.initScene()
    //环境光
    let ambient = new AmbientLight(0x999999);
    this.scene.add(ambient);
    //太阳光
    let sunLight = new PointLight(0xddddaa, 1.5, 500);
    this.scene.add(sunLight);
    this.scene.position.y = 5
    this.renderSun()

  }

  /**
   *
   * @param container 承载canvas 容器
   * @returns {WebGLRenderer} 返回渲染器
   */
  initRender(container) {
    const render = new WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true
    })
    render.setPixelRatio(window.devicePixelRatio);
    render.setSize(container.width, container.height);
    container.el.appendChild(render.domElement);
    //  this.windowResize(render, container)
    return render
  }

  windowResize(render, container) {
    const sun = document.querySelector(".sun")
    window.addEventListener('resize', e => {
      const canvas = document.querySelector(".sun canvas")
      canvas && sun.removeChild(canvas)
      this.render = null
      this.scene = null
      this.initRender(container)
    }, false)

  }

  /**
   *
   * @param container 承载canvas 容器
   * @returns {PerspectiveCamera} 返回相机
   */
  initCamera(container) {
    const camera = new PerspectiveCamera(45, container.width / container.height, 1, 1000)
    camera.position.set(-200, 50, 0)
    camera.lookAt(new Vector3(0, 0, 0));
    return camera
  }

  /**
   *
   * @returns {Scene} 返回场景
   */
  initScene() {
    return new Scene()
  }

  renderSun() {
    const loader = new TextureLoader()
    loader.load(require('./image/diqiu2.png'), (texture) => {
      let m = new CircleGeometry(45, 64)
      let g = new MeshBasicMaterial({
        map: texture,
        transparent: true,
      })
      this._sun = new Mesh(m, g)
      this._sun.rotation.x = -Math.PI / 180 * 75;
      this._sun.rotation.y = -Math.PI / 180 * 75;
      this._sun.position.y = 20
      this._sun.on('click', (ev) => {
        this.fallback()
      });
      this._sun.on('mouseover', (ev) => {
        this.mouseFallback()
      });
      this.scene.add(this._sun)
      this.renderSunGuang(() => {
        this.renderSunGuang2(() => {
          this.renderCircle()
        })
      })
    })
  }

  renderSunGuang(fn) {
    const loader = new TextureLoader()
    loader.load(require('./image/auba.png'), (texture) => {
      let m = new CircleGeometry(48, 64)
      let g = new MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: false
      })
      this._sunGuang = new Mesh(m, g)
      this._sunGuang.rotation.x = -Math.PI / 180 * 75;
      this._sunGuang.rotation.y = -Math.PI / 180 * 75;
      this._sunGuang.rotation.z = -20.2;
      this._sunGuang.position.y = 20
      this.scene.add(this._sunGuang)
      fn && fn()
    })
  }

  renderSunGuang2(fn) {
    const loader = new TextureLoader()
    loader.load(require('./image/guang.png'), (texture) => {
      let m = new CircleGeometry(35, 64)
      let g = new MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: false
      })
      this._SunGuang2 = new Mesh(m, g)
      this._SunGuang2.rotation.x = -Math.PI / 180 * 75;
      this._SunGuang2.rotation.y = -Math.PI / 180 * 75;
      this._SunGuang2.rotation.z = -20.2;
      this._SunGuang2.position.y = 20
      this.scene.add(this._SunGuang2)
      fn && fn()
    })
  }

  sunAni() {
    this._sun.rotation.z += 6 * .0005
    this._sunGuang.rotation.z -= 6 * .0005
    this._SunGuang2.rotation.z -= 6 * .0005
  }

  renderCircle() {
    this.fontLoader(() => {
      this.circles = []
      this.texts = []
      this.rds = []
      this.districtLen = this.props.district.flat().length
      this.oneDistrictLen = this.props.district[0].length
      this.districtLen = this.props.district.length
      let radius = 37,
        lines = [],
        material = new LineBasicMaterial({
          color: '#557cc3',

        })
      for (let i = 1; i < this.districtLen + 1; i++) {
        const segments = radius * (i + 1)
        const geometry = new CircleGeometry((i + 1) * radius, segments);
        const lineLoop = new LineLoop(geometry, material)
        geometry.vertices.shift();
        lineLoop.rotation.x = Math.PI / 180 * 75;
        lineLoop.position.y = 20
        lineLoop.depthWrite = false
        lines.push(lineLoop)
        this.renderCircle2(i)
      }

      this.scene.add(...lines);
    })
  }

  renderCircle2(index) {
    for (let i = 0; i < this.oneDistrictLen; i++) {
      if (!this.props.district[index - 1][i]) return
      const loader = new TextureLoader()
      loader.load(this.props.district[index - 1][i]['name'], (texture) => {
        let m = new CircleGeometry(9, 360);
        let g = new MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthTest: false
        })
        const circle = new Mesh(m, g);
        circle.material.transparent = true
        circle.rotation.x = -Math.PI / 180 * 75;
        circle.rotation.y = -Math.PI / 180 * 75;
        circle.rotation.z = -20.2;
        circle.receiveShadow = true;
        circle.castShadow = true;
        circle.angle = this.randomAngle(this.districtLen)
        circle.speed = 0.0055
        circle.distance = 37 * (index + 1)
        circle.depthWrite = false
        this.scene.add(circle);
        circle.cursor = 'pointer';

        circle.on('click', (ev) => {
          this.fallback(this.props.district[index - 1][i])
        });
        circle.on('mouseover', (ev) => {
          this.mouseFallback(this.props.district[index - 1][i])
        });
        this.circles.push(circle)
        this.last += 1
        if (this.last === this.districtLen) {
          this.scene.add(...this.circles);
          this.done()
        }
      })
    }
  }

  circleMove() {
    this.circles && this.circles.map((circle, index) => {
      circle.angle -= circle.speed
      if (circle.angle > Math.PI * 2) {
        circle.angle -= Math.PI * 2
      }

      circle.position.set(
        circle.distance * Math.sin(circle.angle),
        circle.distance * Math.cos(Math.PI / 180 * 75) * Math.cos(circle.angle) + 20,
        circle.distance * Math.cos(circle.angle)
      );
      this.texts[index] && this.texts[index].position.set(
        circle.distance * Math.sin(circle.angle),
        circle.distance * Math.cos(Math.PI / 180 * 75) * Math.cos(circle.angle) + 20,
        circle.distance * Math.cos(circle.angle)
      )
    })
    this.sunAni()
    this.render.render(this.scene, this.camera);
    this.ani = requestAnimationFrame(this.circleMove.bind(this))
  }

  fontLoader(fn) {
    fn && fn()
    // if (!this.loader) {
    //   this.loader = new FontLoader();
    //   this.loader.load('./STSong_Regular.json', (font) => {
    //     this.font = font
    //     fn && fn()
    //   })
    // }
  }

  randomNumBoth(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    let num = Min + Math.round(Rand * Range); //四舍五入
    return num;
  }

  randomAngle(index) {
    let rd = Math.random() * index * 23
    if (!(rd in this.rds)) {
      rd = this.rds.push(rd)
    }
    return rd
  }
}
