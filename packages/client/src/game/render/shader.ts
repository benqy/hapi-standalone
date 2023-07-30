import { Mesh, Shader, Geometry, Texture } from 'pixi.js'

export const fadeOutShader = (src: string) => {
  const geometry = new Geometry()
    .addAttribute('aVertexPosition', [0, 0, 120, 0, 120, 120, 0, 120], 2)
    .addAttribute(
      'aUvs',
      [
        0,
        0, // u, v
        1,
        0, // u, v
        1,
        1,
        0,
        1
      ],
      2
    )
    .addIndex([0, 1, 2, 0, 2, 3])
  const vertexSrc = `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`
  const perlinTexture = Texture.from(src)
  const fragmentNoiseSrc = `
    precision mediump float;
    varying vec2 vUvs;
    uniform float limit;
    uniform sampler2D noise;

    void main()
    {
        float color = texture2D(noise, vUvs).r;
        color = step(limit, color);
        gl_FragColor = vec4(color);
    }`
  const noiseUniforms = {
    limit: 0.5,
    noise: perlinTexture
  }
  const noiseShader = Shader.from(vertexSrc, fragmentNoiseSrc, noiseUniforms)
  const noiseQuad = new Mesh(geometry, noiseShader)
  noiseQuad.width = 120
  noiseQuad.height = 120
  noiseQuad.x = -60
  noiseQuad.y = -60
  return noiseQuad
}

export const waterShader = (src: string) => {
  const geometry = new Geometry()
    .addAttribute('aVertexPosition', [0, 0, 120, 0, 120, 120, 0, 120], 2)
    .addAttribute(
      'aUvs',
      [
        0,
        0, // u, v
        1,
        0, // u, v
        1,
        1,
        0,
        1
      ],
      2
    )
    .addIndex([0, 1, 2, 0, 2, 3])
  const vertexSrc = `
      precision mediump float;
  
      attribute vec2 aVertexPosition;
      attribute vec2 aUvs;
  
      uniform mat3 translationMatrix;
      uniform mat3 projectionMatrix;
  
      varying vec2 vUvs;
  
      void main() {
  
          vUvs = aUvs;
          gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  
      }`
  const perlinTexture = Texture.from(src)
  const fragmentSrc = `

    precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D noise;
    uniform float limit;

    void main() {

        gl_FragColor = texture2D(noise, vUvs + sin( (limit + (vUvs.x) * 14.) ) * 0.1 );
    }`
  const noiseUniforms = {
    limit: 0,
    noise: perlinTexture
  }
  const shader = Shader.from(vertexSrc, fragmentSrc, noiseUniforms)
  const noiseQuad = new Mesh(geometry, shader)
  noiseQuad.width = 120
  noiseQuad.height = 120
  noiseQuad.x = -60
  noiseQuad.y = -60
  return noiseQuad
}
