import { Injectable, NotFoundException } from '@nestjs/common';

export interface VboVertex {
  x: number;
  y: number;
  z: number;
}

export interface VboObjectInfo {
  objectType: string;
  vertexCount: number;
  vertices: VboVertex[];
  description: string;
  steps: string[];
  codeSnippet: string;
}

@Injectable()
export class OpenGLService {
  private readonly vboObjects: VboObjectInfo[] = [
    {
      objectType: 'triangle',
      vertexCount: 3,
      vertices: [
        { x: 0.0, y: 0.5, z: 0.0 },
        { x: -0.5, y: -0.5, z: 0.0 },
        { x: 0.5, y: -0.5, z: 0.0 },
      ],
      description:
        'A simple triangle defined by 3 vertices in normalized device coordinates.',
      steps: [
        '1. Generate a VBO ID with glGenBuffers(1, &vbo)',
        '2. Bind the VBO with glBindBuffer(GL_ARRAY_BUFFER, vbo)',
        '3. Upload vertex data with glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW)',
        '4. Configure vertex attribute pointer with glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0)',
        '5. Enable the vertex attribute with glEnableVertexAttribArray(0)',
        '6. Draw with glDrawArrays(GL_TRIANGLES, 0, 3)',
      ],
      codeSnippet: `float vertices[] = {
   0.0f,  0.5f, 0.0f,
  -0.5f, -0.5f, 0.0f,
   0.5f, -0.5f, 0.0f
};

unsigned int vbo;
glGenBuffers(1, &vbo);
glBindBuffer(GL_ARRAY_BUFFER, vbo);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

glDrawArrays(GL_TRIANGLES, 0, 3);`,
    },
    {
      objectType: 'quad',
      vertexCount: 6,
      vertices: [
        { x: -0.5, y: 0.5, z: 0.0 },
        { x: -0.5, y: -0.5, z: 0.0 },
        { x: 0.5, y: -0.5, z: 0.0 },
        { x: -0.5, y: 0.5, z: 0.0 },
        { x: 0.5, y: -0.5, z: 0.0 },
        { x: 0.5, y: 0.5, z: 0.0 },
      ],
      description:
        'A quad (rectangle) built from two triangles, totalling 6 vertices.',
      steps: [
        '1. Generate a VBO ID with glGenBuffers(1, &vbo)',
        '2. Bind the VBO with glBindBuffer(GL_ARRAY_BUFFER, vbo)',
        '3. Upload 6-vertex data with glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW)',
        '4. Configure vertex attribute pointer with glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0)',
        '5. Enable the vertex attribute with glEnableVertexAttribArray(0)',
        '6. Draw with glDrawArrays(GL_TRIANGLES, 0, 6)',
      ],
      codeSnippet: `float vertices[] = {
  -0.5f,  0.5f, 0.0f,
  -0.5f, -0.5f, 0.0f,
   0.5f, -0.5f, 0.0f,
  -0.5f,  0.5f, 0.0f,
   0.5f, -0.5f, 0.0f,
   0.5f,  0.5f, 0.0f
};

unsigned int vbo;
glGenBuffers(1, &vbo);
glBindBuffer(GL_ARRAY_BUFFER, vbo);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

glDrawArrays(GL_TRIANGLES, 0, 6);`,
    },
    {
      objectType: 'cube',
      vertexCount: 36,
      vertices: [
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: 0.5, z: -0.5 },
        { x: 0.5, y: 0.5, z: -0.5 },
        { x: -0.5, y: 0.5, z: -0.5 },
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: -0.5, y: -0.5, z: 0.5 },
        { x: 0.5, y: -0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: -0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: -0.5 },
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: -0.5, y: -0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: -0.5 },
        { x: 0.5, y: -0.5, z: 0.5 },
        { x: 0.5, y: -0.5, z: 0.5 },
        { x: -0.5, y: -0.5, z: 0.5 },
        { x: -0.5, y: -0.5, z: -0.5 },
        { x: -0.5, y: 0.5, z: -0.5 },
        { x: 0.5, y: 0.5, z: -0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: 0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: 0.5 },
        { x: -0.5, y: 0.5, z: -0.5 },
      ],
      description:
        'A cube built from 6 faces, each face made of 2 triangles, totalling 36 vertices.',
      steps: [
        '1. Generate a VBO ID with glGenBuffers(1, &vbo)',
        '2. Bind the VBO with glBindBuffer(GL_ARRAY_BUFFER, vbo)',
        '3. Upload 36-vertex data (6 faces × 2 triangles × 3 vertices) with glBufferData',
        '4. Configure vertex attribute pointer with glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0)',
        '5. Enable the vertex attribute with glEnableVertexAttribArray(0)',
        '6. Draw with glDrawArrays(GL_TRIANGLES, 0, 36)',
      ],
      codeSnippet: `float vertices[] = {
  // Back face
  -0.5f, -0.5f, -0.5f,  0.5f, -0.5f, -0.5f,  0.5f,  0.5f, -0.5f,
   0.5f,  0.5f, -0.5f, -0.5f,  0.5f, -0.5f, -0.5f, -0.5f, -0.5f,
  // Front face
  -0.5f, -0.5f,  0.5f,  0.5f, -0.5f,  0.5f,  0.5f,  0.5f,  0.5f,
   0.5f,  0.5f,  0.5f, -0.5f,  0.5f,  0.5f, -0.5f, -0.5f,  0.5f,
  // ... (remaining 4 faces)
};

unsigned int vbo;
glGenBuffers(1, &vbo);
glBindBuffer(GL_ARRAY_BUFFER, vbo);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

glDrawArrays(GL_TRIANGLES, 0, 36);`,
    },
  ];

  getAllVboObjects(): VboObjectInfo[] {
    return this.vboObjects;
  }

  getVboObjectByType(objectType: string): VboObjectInfo {
    const found = this.vboObjects.find(
      (obj) => obj.objectType.toLowerCase() === objectType.toLowerCase(),
    );
    if (!found) {
      throw new NotFoundException(
        `VBO object type "${objectType}" not found. Available types: ${this.vboObjects.map((o) => o.objectType).join(', ')}`,
      );
    }
    return found;
  }
}
