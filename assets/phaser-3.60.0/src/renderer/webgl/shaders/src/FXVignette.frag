#define SHADER_NAME VIGNETTE_FS

precision mediump float;

uniform sampler2D uMainSampler;
uniform float radius;
uniform float strength;
uniform vec2 position;

varying vec2 outTexCoord;

void main ()
{
    vec4 col = vec4(1.0);

    float d = length(outTexCoord - position);

    if (d <= radius)
    {
        float g = d / radius;
        g = sin(g * 3.14 * strength);
    	col = vec4(g * g * g);
    }

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    gl_FragColor = texture * (1.0 - col);
}
