// watershader.js

const waterShader = `

precision mediump float;

uniform float time;
uniform vec2 resolution;

void main() {
    // Рассчитываем координаты на экране
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    // Смещение по оси Y, чтобы создать анимацию волны
    float yOffset = sin(uv.x * 10.0 + time * 2.0) * 0.02;

    // Устанавливаем цвет пикселя с учетом смещения по Y
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // синий цвет (R=0, G=0, B=1)
}

`;

export default waterShader;
