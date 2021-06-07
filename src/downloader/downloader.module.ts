import { Module } from '@nestjs/common';
import { DownloaderService } from './downloader.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DownloaderService],
})
export class DownloaderModule {}
