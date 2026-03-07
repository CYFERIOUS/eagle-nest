import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OpenGLController } from './opengl.controller';
import { OpenGLService } from './opengl.service';

describe('OpenGLController', () => {
  let controller: OpenGLController;
  let service: OpenGLService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenGLController],
      providers: [OpenGLService],
    }).compile();

    controller = module.get<OpenGLController>(OpenGLController);
    service = module.get<OpenGLService>(OpenGLService);
  });

  describe('getAllVboObjects', () => {
    it('should return all VBO objects', () => {
      const result = controller.getAllVboObjects();
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should delegate to service.getAllVboObjects()', () => {
      const spy = jest.spyOn(service, 'getAllVboObjects');
      controller.getAllVboObjects();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getVboObjectByType', () => {
    it('should return triangle VBO info', () => {
      const result = controller.getVboObjectByType('triangle');
      expect(result.objectType).toBe('triangle');
    });

    it('should return cube VBO info', () => {
      const result = controller.getVboObjectByType('cube');
      expect(result.objectType).toBe('cube');
    });

    it('should delegate to service.getVboObjectByType()', () => {
      const spy = jest.spyOn(service, 'getVboObjectByType');
      controller.getVboObjectByType('quad');
      expect(spy).toHaveBeenCalledWith('quad');
    });

    it('should propagate NotFoundException for unknown types', () => {
      expect(() => controller.getVboObjectByType('sphere')).toThrow(
        NotFoundException,
      );
    });
  });
});
