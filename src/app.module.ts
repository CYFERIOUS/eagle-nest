import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenGLModule } from './opengl/opengl.module';

@Module({
  imports: [OpenGLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
