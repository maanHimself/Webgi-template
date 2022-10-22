import { Vector2 } from "three";
import { Texture } from "three";

export default {
  uniforms: {
    tDiffuse: { value: new Texture() },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform float time;
		uniform float progress;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		
		float OCTAVES = 8.0;


		float rand(vec2 n) { 
			return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
		}
		
		float noise(vec2 p){
			vec2 ip = floor(p);
			vec2 u = fract(p);
			u = u*u*(3.0-2.0*u);
			
			float res = mix(
				mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
				mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
			return res*res;
		}

		 
		 float rand2(vec2 co){
			return fract(cos(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		 }
		 
		 // Rough Value noise implementation
		 float valueNoiseSimple(vec2 vl) {
			float minStep = 2.0 ;
		 
			vec2 grid = floor(vl);
			vec2 gridPnt1 = grid;
			vec2 gridPnt2 = vec2(grid.x, grid.y + minStep);
			vec2 gridPnt3 = vec2(grid.x + minStep, grid.y);
			vec2 gridPnt4 = vec2(gridPnt3.x, gridPnt2.y);
		 
			 float s = rand2(grid);
			 float t = rand2(gridPnt3);
			 float u = rand2(gridPnt2);
			 float v = rand2(gridPnt4);
			 
			 float x1 = smoothstep(0., 1., fract(vl.x));
			 float interpX1 = mix(s, t, x1);
			 float interpX2 = mix(u, v, x1);
			 
			 float y = smoothstep(0., 1., fract(vl.y));
			 float interpY = mix(interpX1, interpX2, y);
			 
			 return interpY;
		 }
		 
		 
		 float fractalNoise(vec2 vl) {
			 float persistance = 2.0;
			 float amplitude = 0.5;
			 float rez = 0.0;
			 vec2 p = vl;
			 
			 for (float i = 0.0; i < OCTAVES; i++) {
				 rez += amplitude * valueNoiseSimple(p);
				 amplitude /= persistance;
				 p *= persistance;
			 }
			 return rez;
		 }
		 
		 float complexFBM(vec2 p) {
			 float slow = time / 2.5  * 0.3;
			 float fast = time / .5  * 0.3;
			 vec2 offset1 = vec2(slow  , 0.); // Main front
			 vec2 offset2 = vec2(sin(fast )* 0.1, 0.); // sub fronts
		 
			 return fractalNoise( p + offset1 + fractalNoise(
						 p + fractalNoise(
							 p + 2. * fractalNoise(p - offset2)
						 )
					 )
				 );
		 }
		 


		void main() {
			// float n = min(1. ,  noise(vUv *10. + time * 0.5) * 3.);
			vec3 color = texture2D( tDiffuse, vUv).xyz;
			// // color *= vec3(n);
			
			
			
			vec3 blueColor = vec3(	0, 0, 0)/255.;
			vec3 orangeColor2 = vec3(	24, 48, 203)/255.;
			
			// vec3 rez = mix( blueColor,orangeColor2,  complexFBM(vUv ));
			gl_FragColor = vec4(color,1.);		

		}`,
};
