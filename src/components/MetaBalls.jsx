// src/components/MetaBalls.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./metaballs.css";

export default function MetaBalls() {
  const containerRef = useRef(null);
  const materialRef = useRef(null);
  const rendererRef = useRef(null);
  const rafRef = useRef(null);
  const cursorSphere3D = useRef(new THREE.Vector3(0, 0, 0));
  const mouseTarget = useRef(new THREE.Vector2(0.5, 0.5));
  const mousePos = useRef(new THREE.Vector2(0.5, 0.5));
  const clockRef = useRef(null);

  useEffect(() => {
    // Device detection & settings (production)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isLowPowerDevice = isMobile || (navigator.hardwareConcurrency || 4) <= 4;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 2.5);

    const settings = {
      sphereCount: isMobile ? 4 : 6,
      fixedTopLeftRadius: 0.8,
      fixedBottomRightRadius: 0.9,
      smallTopLeftRadius: 0.3,
      smallBottomRightRadius: 0.35,
      cursorRadiusMin: 0.08,
      cursorRadiusMax: 0.15,
      animationSpeed: 0.6,
      movementScale: 1.2,
      mouseSmoothness: 0.1,
      mergeDistance: 1.5,
      mouseProximityEffect: true,
      minMovementScale: 0.3,
      maxMovementScale: 1.0,
      ambientIntensity: 0.12,
      diffuseIntensity: 1.2,
      specularIntensity: 2.5,
      specularPower: 3.0,
      fresnelPower: 0.8,
      backgroundColor: new THREE.Color(0x0a0a15),
      sphereColor: new THREE.Color(0x050510),
      lightColor: new THREE.Color(0xccaaff),
      lightPosition: new THREE.Vector3(0.9, 0.9, 1.2),
      contrast: 1.6,
      fogDensity: 0.06,
      cursorGlowIntensity: 1.2,
      cursorGlowRadius: 2.2,
      cursorGlowColor: new THREE.Color(0xaa77ff)
    };

    // init
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    clockRef.current = new THREE.Clock();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
      premultipliedAlpha: false
    });
    rendererRef.current = renderer;

    const pixelRatio = Math.min(devicePixelRatio, isMobile ? 2 : 2.5);
    renderer.setPixelRatio(pixelRatio);

    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    // ensure correct color space (Three r178+)
    try {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } catch (e) {
      /* ignore if older build */
    }

    // style the canvas so it sits behind UI
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    container.appendChild(canvas);

    // Shader material (fragment/vertex strings embedded)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader: adapted from your original script, optimized for production
    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uActualResolution;
      uniform float uPixelRatio;
      uniform vec2 uMousePosition;
      uniform vec3 uCursorSphere;
      uniform float uCursorRadius;
      uniform int uSphereCount;
      uniform float uFixedTopLeftRadius;
      uniform float uFixedBottomRightRadius;
      uniform float uSmallTopLeftRadius;
      uniform float uSmallBottomRightRadius;
      uniform float uMergeDistance;
      uniform float uSmoothness;
      uniform float uAmbientIntensity;
      uniform float uDiffuseIntensity;
      uniform float uSpecularIntensity;
      uniform float uSpecularPower;
      uniform float uFresnelPower;
      uniform vec3 uBackgroundColor;
      uniform vec3 uSphereColor;
      uniform vec3 uLightColor;
      uniform vec3 uLightPosition;
      uniform float uContrast;
      uniform float uFogDensity;
      uniform float uAnimationSpeed;
      uniform float uMovementScale;
      uniform bool uMouseProximityEffect;
      uniform float uMinMovementScale;
      uniform float uMaxMovementScale;
      uniform float uCursorGlowIntensity;
      uniform float uCursorGlowRadius;
      uniform vec3 uCursorGlowColor;
      uniform float uIsSafari;
      uniform float uIsMobile;
      uniform float uIsLowPower;

      varying vec2 vUv;
      const float PI = 3.14159265359;
      const float EPSILON = 0.001;
      const float MAX_DIST = 100.0;

      float smin(float a, float b, float k) {
        float h = max(k - abs(a - b), 0.0) / k;
        return min(a, b) - h * h * k * 0.25;
      }
      float sdSphere(vec3 p, float r) {
        return length(p) - r;
      }

      vec3 screenToWorld(vec2 normalizedPos) {
        vec2 uv = normalizedPos * 2.0 - 1.0;
        uv.x *= uResolution.x / uResolution.y;
        return vec3(uv * 2.0, 0.0);
      }

      float getDistanceToCenter(vec2 pos) {
        float dist = length(pos - vec2(0.5, 0.5)) * 2.0;
        return smoothstep(0.0, 1.0, dist);
      }

      float sceneSDF(vec3 pos) {
        float result = MAX_DIST;
        vec3 topLeftPos = screenToWorld(vec2(0.08, 0.92));
        float topLeft = sdSphere(pos - topLeftPos, uFixedTopLeftRadius);
        vec3 smallTopLeftPos = screenToWorld(vec2(0.25, 0.72));
        float smallTopLeft = sdSphere(pos - smallTopLeftPos, uSmallTopLeftRadius);
        vec3 bottomRightPos = screenToWorld(vec2(0.92, 0.08));
        float bottomRight = sdSphere(pos - bottomRightPos, uFixedBottomRightRadius);
        vec3 smallBottomRightPos = screenToWorld(vec2(0.72, 0.25));
        float smallBottomRight = sdSphere(pos - smallBottomRightPos, uSmallBottomRightRadius);

        float t = uTime * uAnimationSpeed;
        float dynamicMovementScale = uMovementScale;
        if (uMouseProximityEffect) {
          float distToCenter = getDistanceToCenter(uMousePosition);
          float mixFactor = smoothstep(0.0, 1.0, distToCenter);
          dynamicMovementScale = mix(uMinMovementScale, uMaxMovementScale, mixFactor);
        }

        int maxIter = uIsMobile > 0.5 ? 4 : (uIsLowPower > 0.5 ? 6 : min(uSphereCount, 10));
        for (int i = 0; i < 10; i++) {
          if (i >= uSphereCount || i >= maxIter) break;
          float fi = float(i);
          float speed = 0.4 + fi * 0.12;
          float radius = 0.12 + mod(fi, 3.0) * 0.06;
          float orbitRadius = (0.3 + mod(fi, 3.0) * 0.15) * dynamicMovementScale;
          float phaseOffset = fi * PI * 0.35;
          float distToCursor = length(vec3(0.0) - uCursorSphere);
          float proximityScale = 1.0 + (1.0 - smoothstep(0.0, 1.0, distToCursor)) * 0.5;
          orbitRadius *= proximityScale;
          vec3 offset;
          if (i == 0) {
            offset = vec3(sin(t * speed) * orbitRadius * 0.7, sin(t * 0.5) * orbitRadius, cos(t * speed * 0.7) * orbitRadius * 0.5);
          } else if (i == 1) {
            offset = vec3(sin(t * speed + PI) * orbitRadius * 0.5, -sin(t * 0.5) * orbitRadius, cos(t * speed * 0.7 + PI) * orbitRadius * 0.5);
          } else {
            offset = vec3(sin(t * speed + phaseOffset) * orbitRadius * 0.8, cos(t * speed * 0.85 + phaseOffset * 1.3) * orbitRadius * 0.6, sin(t * speed * 0.5 + phaseOffset) * 0.3);
          }
          vec3 toCursor = uCursorSphere - offset;
          float cursorDist = length(toCursor);
          if (cursorDist < uMergeDistance && cursorDist > 0.0) {
            float attraction = (1.0 - cursorDist / uMergeDistance) * 0.3;
            offset += normalize(toCursor) * attraction;
          }
          float movingSphere = sdSphere(pos - offset, radius);
          float blend = 0.05;
          if (cursorDist < uMergeDistance) {
            float influence = 1.0 - (cursorDist / uMergeDistance);
            blend = mix(0.05, uSmoothness, influence * influence * influence);
          }
          result = smin(result, movingSphere, blend);
        }

        float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);
        float topLeftGroup = smin(topLeft, smallTopLeft, 0.4);
        float bottomRightGroup = smin(bottomRight, smallBottomRight, 0.4);
        result = smin(result, topLeftGroup, 0.3);
        result = smin(result, bottomRightGroup, 0.3);
        result = smin(result, cursorBall, uSmoothness);
        return result;
      }

      vec3 calcNormal(vec3 p) {
        float eps = uIsLowPower > 0.5 ? 0.0015 : 0.0005;
        return normalize(vec3(
          sceneSDF(p + vec3(eps, 0, 0)) - sceneSDF(p - vec3(eps, 0, 0)),
          sceneSDF(p + vec3(0, eps, 0)) - sceneSDF(p - vec3(0, eps, 0)),
          sceneSDF(p + vec3(0, 0, eps)) - sceneSDF(p - vec3(0, 0, eps))
        ));
      }

      float ambientOcclusion(vec3 p, vec3 n) {
        if (uIsLowPower > 0.5) {
          float h1 = sceneSDF(p + n * 0.03);
          float h2 = sceneSDF(p + n * 0.06);
          float occ = (0.03 - h1) + (0.06 - h2) * 0.5;
          return clamp(1.0 - occ * 2.0, 0.0, 1.0);
        } else {
          float occ = 0.0;
          float weight = 1.0;
          for (int i = 0; i < 6; i++) {
            float dist = 0.01 + 0.015 * float(i * i);
            float h = sceneSDF(p + n * dist);
            occ += (dist - h) * weight;
            weight *= 0.85;
          }
          return clamp(1.0 - occ, 0.0, 1.0);
        }
      }

      float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
        if (uIsLowPower > 0.5) {
          float result = 1.0;
          float t = mint;
          for (int i = 0; i < 3; i++) {
            t += 0.3;
            if (t >= maxt) break;
            float h = sceneSDF(ro + rd * t);
            if (h < EPSILON) return 0.0;
            result = min(result, k * h / t);
          }
          return result;
        } else {
          float result = 1.0;
          float t = mint;
          for (int i = 0; i < 20; i++) {
            if (t >= maxt) break;
            float h = sceneSDF(ro + rd * t);
            if (h < EPSILON) return 0.0;
            result = min(result, k * h / t);
            t += h;
          }
          return result;
        }
      }

      float rayMarch(vec3 ro, vec3 rd) {
        float t = 0.0;
        int maxSteps = uIsMobile > 0.5 ? 32 : (uIsSafari > 0.5 ? 48 : 64);
        for (int i = 0; i < 64; i++) {
          if (i >= maxSteps) break;
          vec3 p = ro + rd * t;
          float d = sceneSDF(p);
          if (d < EPSILON) {
            return t;
          }
          if (t > 5.0) break;
          t += d * (uIsLowPower > 0.5 ? 0.9 : 0.7);
        }
        return -1.0;
      }

      vec3 lighting(vec3 p, vec3 rd, float t) {
        if (t < 0.0) return vec3(0.0);
        vec3 normal = calcNormal(p);
        vec3 viewDir = -rd;
        vec3 baseColor = uSphereColor;
        float ao = ambientOcclusion(p, normal);
        vec3 ambient = uLightColor * uAmbientIntensity * ao;
        vec3 lightDir = normalize(uLightPosition);
        float diff = max(dot(normal, lightDir), 0.0);
        float shadow = softShadow(p, lightDir, 0.01, 10.0, 20.0);
        vec3 diffuse = uLightColor * diff * uDiffuseIntensity * shadow;
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
        vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;
        vec3 fresnelRim = uLightColor * fresnel * 0.4;
        float distToCursor = length(p - uCursorSphere);
        if (distToCursor < uCursorRadius + 0.4) {
          float highlight = 1.0 - smoothstep(0.0, uCursorRadius + 0.4, distToCursor);
          specular += uLightColor * highlight * 0.2;
          float glow = exp(-distToCursor * 3.0) * 0.15;
          ambient += uLightColor * glow * 0.5;
        }
        vec3 color = (baseColor + ambient + diffuse + specular + fresnelRim) * ao;
        color = pow(color, vec3(uContrast * 0.9));
        color = color / (color + vec3(0.8));
        return color;
      }

      float calculateCursorGlow(vec3 worldPos) {
        float dist = length(worldPos.xy - uCursorSphere.xy);
        float glow = 1.0 - smoothstep(0.0, uCursorGlowRadius, dist);
        glow = pow(glow, 2.0);
        return glow * uCursorGlowIntensity;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
        uv.x *= uResolution.x / uResolution.y;
        vec3 ro = vec3(uv * 2.0, -1.0);
        vec3 rd = vec3(0.0, 0.0, 1.0);
        float t = rayMarch(ro, rd);
        vec3 p = ro + rd * t;
        vec3 color = lighting(p, rd, t);
        float cursorGlow = calculateCursorGlow(ro);
        vec3 glowContribution = uCursorGlowColor * cursorGlow;
        if (t > 0.0) {
          float fogAmount = 1.0 - exp(-t * uFogDensity);
          color = mix(color, uBackgroundColor.rgb, fogAmount * 0.3);
          color += glowContribution * 0.3;
          gl_FragColor = vec4(color, 1.0);
        } else {
          if (cursorGlow > 0.01) {
            gl_FragColor = vec4(glowContribution, cursorGlow * 0.8);
          } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          }
        }
      }
    `;

    // Material & geometry
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uActualResolution: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) },
        uPixelRatio: { value: pixelRatio },
        uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
        uCursorRadius: { value: settings.cursorRadiusMin },
        uSphereCount: { value: settings.sphereCount },
        uFixedTopLeftRadius: { value: settings.fixedTopLeftRadius },
        uFixedBottomRightRadius: { value: settings.fixedBottomRightRadius },
        uSmallTopLeftRadius: { value: settings.smallTopLeftRadius },
        uSmallBottomRightRadius: { value: settings.smallBottomRightRadius },
        uMergeDistance: { value: settings.mergeDistance },
        uSmoothness: { value: 0.45 },
        uAmbientIntensity: { value: settings.ambientIntensity },
        uDiffuseIntensity: { value: settings.diffuseIntensity },
        uSpecularIntensity: { value: settings.specularIntensity },
        uSpecularPower: { value: settings.specularPower },
        uFresnelPower: { value: settings.fresnelPower },
        uBackgroundColor: { value: settings.backgroundColor },
        uSphereColor: { value: settings.sphereColor },
        uLightColor: { value: settings.lightColor },
        uLightPosition: { value: settings.lightPosition },
        uContrast: { value: settings.contrast },
        uFogDensity: { value: settings.fogDensity },
        uAnimationSpeed: { value: settings.animationSpeed },
        uMovementScale: { value: settings.movementScale },
        uMouseProximityEffect: { value: settings.mouseProximityEffect },
        uMinMovementScale: { value: settings.minMovementScale },
        uMaxMovementScale: { value: settings.maxMovementScale },
        uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
        uCursorGlowRadius: { value: settings.cursorGlowRadius },
        uCursorGlowColor: { value: settings.cursorGlowColor },
        uIsSafari: { value: isSafari ? 1.0 : 0.0 },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 },
        uIsLowPower: { value: isLowPowerDevice ? 1.0 : 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // helper functions copied/adapted from original
    function screenToWorldJS(normalizedX, normalizedY) {
      const uv_x = normalizedX * 2.0 - 1.0;
      const uv_y = normalizedY * 2.0 - 1.0;
      const aspect = window.innerWidth / window.innerHeight;
      return new THREE.Vector3(uv_x * aspect * 2.0, uv_y * 2.0, 0.0);
    }

    function updateStory(x, y, radius, merges) {
      const storyText = container.querySelector("#story-text");
      if (!storyText) return;
      const text = isMobile


        ? `vessel: (${x}, ${y})<br>field: ${radius}u<br>merges: ${merges}`
        : `our vessel drifts at coordinates (${x}, ${y})<br>gravitational field extends ${radius} units into quantum foam<br>currently merging with ${merges} other entities`;


      storyText.innerHTML = text;
    }

    // pointer handlers with throttling
    let activeMerges = 0;
    let lastMoveTime = 0;
    const moveThrottle = isMobile ? 32 : 16; // Throttle mouse events
    
    function onPointerMove(event) {
      const now = Date.now();
      if (now - lastMoveTime < moveThrottle) return;
      lastMoveTime = now;
      
      const clientX = event.clientX !== undefined ? event.clientX : (event.touches && event.touches[0].clientX);
      const clientY = event.clientY !== undefined ? event.clientY : (event.touches && event.touches[0].clientY);
      if (clientX == null || clientY == null) return;

      mouseTarget.current.x = clientX / window.innerWidth;
      mouseTarget.current.y = 1.0 - clientY / window.innerHeight;

      const normalizedX = mouseTarget.current.x;
      const normalizedY = mouseTarget.current.y;
      const worldPos = screenToWorldJS(normalizedX, normalizedY);
      cursorSphere3D.current.copy(worldPos);

      let closestDistance = 1000.0;
      activeMerges = 0;
      const fixedPositions = [
        screenToWorldJS(0.08, 0.92),
        screenToWorldJS(0.25, 0.72),
        screenToWorldJS(0.92, 0.08),
        screenToWorldJS(0.72, 0.25)
      ];
      fixedPositions.forEach((pos) => {
        const dist = cursorSphere3D.current.distanceTo(pos);
        closestDistance = Math.min(closestDistance, dist);
        if (dist < settings.mergeDistance) activeMerges++;
      });

      const proximityFactor = Math.max(0, 1.0 - closestDistance / settings.mergeDistance);
      const smoothFactor = proximityFactor * proximityFactor * (3.0 - 2.0 * proximityFactor);
      const dynamicRadius = settings.cursorRadiusMin + (settings.cursorRadiusMax - settings.cursorRadiusMin) * smoothFactor;

      material.uniforms.uCursorSphere.value.copy(cursorSphere3D.current);
      material.uniforms.uCursorRadius.value = dynamicRadius;
    }

    function onTouchStart(e) {
      e.preventDefault();
      if (e.touches && e.touches.length > 0) onPointerMove(e);
    }
    function onTouchMove(e) {
      e.preventDefault();
      if (e.touches && e.touches.length > 0) onPointerMove(e);
    }

    function onWindowResize() {
      // Debounce resize events
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const currentPixelRatio = Math.min(devicePixelRatio, isMobile ? 2 : 2.5);
        renderer.setSize(w, h);
        renderer.setPixelRatio(currentPixelRatio);
        material.uniforms.uResolution.value.set(w, h);
        material.uniforms.uActualResolution.value.set(w * currentPixelRatio, h * currentPixelRatio);
        material.uniforms.uPixelRatio.value = currentPixelRatio;
        // reapply canvas css
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }, 100);
    }

    // attach listeners
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onWindowResize, { passive: true });
    window.addEventListener("orientationchange", () => setTimeout(onWindowResize, 100), { passive: true });

    // prime cursor at center
    onPointerMove({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

    // animation loop with performance throttling
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : (isLowPowerDevice ? 45 : 60);
    const frameInterval = 1000 / targetFPS;
    
    function render(currentTime) {
      rafRef.current = requestAnimationFrame(render);

      // Throttle rendering based on device capabilities
      if (currentTime - lastFrameTime < frameInterval) {
        return;
      }
      lastFrameTime = currentTime;

      // smooth mouse
      mousePos.current.x += (mouseTarget.current.x - mousePos.current.x) * settings.mouseSmoothness;
      mousePos.current.y += (mouseTarget.current.y - mousePos.current.y) * settings.mouseSmoothness;

      material.uniforms.uTime.value = clockRef.current.getElapsedTime();
      material.uniforms.uMousePosition.value = mousePos.current;
      // renderer render
      renderer.render(scene, camera);
    }
    render();

    // cleanup on unmount
    return () => {
      // cancel animation
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // remove listeners
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onWindowResize);
      // dispose three objects
      try {
        scene.remove(mesh);
        geometry.dispose();
        material.dispose();
        if (rendererRef.current) {
          rendererRef.current.forceContextLoss();
          const canvasEl = rendererRef.current.domElement;
          if (canvasEl && canvasEl.parentNode) canvasEl.parentNode.removeChild(canvasEl);
          rendererRef.current.dispose();
        }
      } catch (err) {
        // ignore disposal errors
      }
    };
  }, []); // run once

  return (
    <section className="metaballs-section" ref={containerRef}>
      <div id="container"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="gradient-text">Intelligence that listens.</span><br />
          <span className="hero-subtitle-text">Technology that cares.</span>
        </h1>
        <p className="hero-description">
          We build AI solutions that understand your business, not just your data.
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn-primary btn-large">Start with a conversation</a>
          <a href="#services" className="btn-secondary btn-large">Explore solutions</a>
        </div>
      </div>
    </section>
  );
}
