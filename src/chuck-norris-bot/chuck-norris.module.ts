import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChuckNorris } from './chuck-norris.service';

@Global() 
@Module({
  imports: [HttpModule],
  providers: [ChuckNorris],
  exports: [ChuckNorris],
})
export class ChuckNorrisModule {}
