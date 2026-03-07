import { Module } from '@nestjs/common';
import { OpenGLController } from './opengl.controller';
import { OpenGLService } from './opengl.service';

@Module({
  controllers: [OpenGLController],
  providers: [OpenGLService],
})
export class OpenGLModule {}
