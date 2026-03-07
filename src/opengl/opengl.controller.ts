import { Controller, Get, Param } from '@nestjs/common';
import { OpenGLService, VboObjectInfo } from './opengl.service';

@Controller('opengl')
export class OpenGLController {
  constructor(private readonly openGLService: OpenGLService) {}

  @Get('vbo')
  getAllVboObjects(): VboObjectInfo[] {
    return this.openGLService.getAllVboObjects();
  }

  @Get('vbo/:objectType')
  getVboObjectByType(@Param('objectType') objectType: string): VboObjectInfo {
    return this.openGLService.getVboObjectByType(objectType);
  }
}
