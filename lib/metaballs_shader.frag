#version 320 es
precision highp float;

layout(location = 0) out vec4 fragColor;

// 필요한 uniforms
layout(location = 0) uniform float time;
layout(location = 1) uniform float minimumGlowSum;
layout(location = 2) uniform float glowIntensity;
layout(location = 3) uniform float metaballs;

// 30개의 metaball만 남기기
layout(location = 4) uniform vec3 metaball1;
layout(location = 5) uniform vec3 metaball2;
layout(location = 6) uniform vec3 metaball3;
layout(location = 7) uniform vec3 metaball4;
layout(location = 8) uniform vec3 metaball5;
layout(location = 9) uniform vec3 metaball6;
layout(location = 10) uniform vec3 metaball7;
layout(location = 11) uniform vec3 metaball8;
layout(location = 12) uniform vec3 metaball9;
layout(location = 13) uniform vec3 metaball10;
layout(location = 14) uniform vec3 metaball11;
layout(location = 15) uniform vec3 metaball12;
layout(location = 16) uniform vec3 metaball13;
layout(location = 17) uniform vec3 metaball14;
layout(location = 18) uniform vec3 metaball15;
layout(location = 19) uniform vec3 metaball16;
layout(location = 20) uniform vec3 metaball17;
layout(location = 21) uniform vec3 metaball18;
layout(location = 22) uniform vec3 metaball19;
layout(location = 23) uniform vec3 metaball20;
layout(location = 24) uniform vec3 metaball21;
layout(location = 25) uniform vec3 metaball22;
layout(location = 26) uniform vec3 metaball23;
layout(location = 27) uniform vec3 metaball24;
layout(location = 28) uniform vec3 metaball25;
layout(location = 29) uniform vec3 metaball26;
layout(location = 30) uniform vec3 metaball27;
layout(location = 31) uniform vec3 metaball28;
layout(location = 32) uniform vec3 metaball29;
layout(location = 33) uniform vec3 metaball30;

// addSum 함수와 getSum 함수도 30개로 제한
float addSum(vec3 metaball, vec2 coords) {
    float dx = metaball.x - coords.x;
    float dy = metaball.y - coords.y;
    float radius = metaball.z;
    return ((radius * radius) / (dx * dx + dy * dy));
}

float getSum(vec2 coords) {
    float sum = 0.0;
    if (metaballs < 1.0) return sum;
    sum += addSum(metaball1, coords);
    if (metaballs < 2.0) return sum;
    sum += addSum(metaball2, coords);
    // ...
    if (metaballs < 30.0) return sum;
    sum += addSum(metaball30, coords);
    return sum;
}

void main() {
    vec2 coords = gl_FragCoord.xy;
    float sum = getSum(coords);
    if (sum >= 1.0) {
        fragColor = vec4(1, 1, 1, 1);
    } else if (sum > minimumGlowSum) {
        float n = ((sum - minimumGlowSum) / (1.0 - minimumGlowSum)) * glowIntensity;
        fragColor = vec4(n) + ((noise(vec4(coords, time, 0.0)) - 0.5) / 255.0);
    } else {
        fragColor = vec4(0, 0, 0, 0);
    }
}