<template>
  <span>
    <div class="hidden" id="vertexShader">
      varying vec2 vertexUV; varying vec3 vertexNormal; void main(){ vertexUV =
      uv; vertexNormal = normalize(normalMatrix * normal); gl_Position =
      projectionMatrix * modelViewMatrix * vec4(position, 1); }
    </div>

    <div class="hidden" id="fragmentShader">
      uniform sampler2D globeTexture; varying vec2 vertexUV; varying vec3
      vertexNormal; void main(){ float intensity = 1.05 - dot(vertexNormal,
      vec3(0,0,1)); vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
      gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz,
      1.0); }
    </div>

    <div class="hidden" id="atmosphereVertexShader">
      varying vec3 vertexNormal; void main(){ vertexNormal =
      normalize(normalMatrix * normal); gl_Position = projectionMatrix *
      modelViewMatrix * vec4(position, 0.9); }
    </div>

    <div class="hidden" id="atmosphereFragmentShader">
      varying vec3 vertexNormal; void main(){ float intensity = pow(0.6 -
      dot(vertexNormal, vec3(0,0,1.0)), 2.0); gl_FragColor = vec4(0.3, 0.6, 1.0,
      1.0) * intensity; }
    </div>
  </span>
</template>
