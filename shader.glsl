shader fragment
{
  precision highp float;

  // uniforms
  uniform vec2 u_resolution;
  uniform float u_time;

  // varyings
  varying vec2 v_uv;

  void main()
  {
    // compute the fragment position in window space
    vec2 p = gl_FragCoord.xy / u_resolution;

    // compute the time-dependent texture coordinate
    vec2 uv = p * 0.5 + 0.5;
    uv += vec2(sin(u_time * 0.1), cos(u_time * 0.1)) * 0.01;

    // sample the background texture
    vec4 color = texture2D(u_texture, uv);

    // output the fragment color
    gl_FragColor = color;
  }
}