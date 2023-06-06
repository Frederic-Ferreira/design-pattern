import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { BotsModuleModule } from './bots-module/bots-module.module';
import { ChuckNorrisModule } from './chuck-norris-bot/chuck-norris.module';
import { BotFactoryService } from './bots-module/bots-factory.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, BotsModuleModule, ChuckNorrisModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway, BotFactoryService],
})
export class AppModule {}
