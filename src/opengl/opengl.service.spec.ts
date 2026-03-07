import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OpenGLService } from './opengl.service';

describe('OpenGLService', () => {
  let service: OpenGLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenGLService],
    }).compile();

    service = module.get<OpenGLService>(OpenGLService);
  });

  describe('getAllVboObjects', () => {
    it('should return all VBO object definitions', () => {
      const result = service.getAllVboObjects();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should include triangle, quad and cube objects', () => {
      const result = service.getAllVboObjects();
      const types = result.map((o) => o.objectType);
      expect(types).toContain('triangle');
      expect(types).toContain('quad');
      expect(types).toContain('cube');
    });

    it('should return objects with correct vertex counts', () => {
      const result = service.getAllVboObjects();
      const triangle = result.find((o) => o.objectType === 'triangle');
      const quad = result.find((o) => o.objectType === 'quad');
      const cube = result.find((o) => o.objectType === 'cube');

      expect(triangle?.vertexCount).toBe(3);
      expect(quad?.vertexCount).toBe(6);
      expect(cube?.vertexCount).toBe(36);
    });

    it('should return objects with vertices arrays matching vertex count', () => {
      const result = service.getAllVboObjects();
      for (const obj of result) {
        expect(obj.vertices).toHaveLength(obj.vertexCount);
      }
    });

    it('should return objects with steps and codeSnippet', () => {
      const result = service.getAllVboObjects();
      for (const obj of result) {
        expect(obj.steps.length).toBeGreaterThan(0);
        expect(obj.codeSnippet).toBeTruthy();
      }
    });
  });

  describe('getVboObjectByType', () => {
    it('should return the triangle VBO info', () => {
      const result = service.getVboObjectByType('triangle');
      expect(result.objectType).toBe('triangle');
      expect(result.vertexCount).toBe(3);
    });

    it('should return the quad VBO info', () => {
      const result = service.getVboObjectByType('quad');
      expect(result.objectType).toBe('quad');
      expect(result.vertexCount).toBe(6);
    });

    it('should return the cube VBO info', () => {
      const result = service.getVboObjectByType('cube');
      expect(result.objectType).toBe('cube');
      expect(result.vertexCount).toBe(36);
    });

    it('should be case-insensitive', () => {
      const result = service.getVboObjectByType('TRIANGLE');
      expect(result.objectType).toBe('triangle');
    });

    it('should throw NotFoundException for unknown object type', () => {
      expect(() => service.getVboObjectByType('sphere')).toThrow(
        NotFoundException,
      );
    });
  });
});
