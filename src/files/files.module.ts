import { Module } from '@nestjs/common';
import { FilesService } from './core/files.service';

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
