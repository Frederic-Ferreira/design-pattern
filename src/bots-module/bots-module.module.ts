import { Module } from '@nestjs/common';
import { WhoIsService } from 'src/who-is/who-is.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [WhoIsService],
    exports: [WhoIsService]
})
export class BotsModuleModule {}
