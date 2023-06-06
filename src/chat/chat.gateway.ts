import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { WhoIsService } from '../who-is/who-is.service';
import { IBot } from '../bots-module/Ibot-interface';
import { BotFactoryService } from '../bots-module/bots-factory.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection<Socket>, OnGatewayDisconnect<Socket> {
  private static LOGGER: Logger = new Logger("Gateway")
  private static CHANNEL = "message";
  private readonly ibots: IBot[];

  constructor(private whoIs: WhoIsService, botfactory: BotFactoryService){
    this.ibots = botfactory.createBots(2)
  }

  @WebSocketServer()
  private server: Server;
  
  async handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, ...args: any[]) {
    const user = await this.whoIs.get(socket)

    this.ibots.forEach(async bot => {
      socket.emit(ChatGateway.CHANNEL, await bot.hello())
    })

    ChatGateway.LOGGER.log(`Connexion de ${user.name} ip = ${user.ip}`)
    this.server.emit(ChatGateway.CHANNEL, `@${user.name} online at ${user.ip}`)
  }
  
  @SubscribeMessage('message')
  handleMessage(socket: Socket, payload: any): void {
    this.server.emit(ChatGateway.CHANNEL, `@${socket.id} ${payload}`)

    const reactions = []

    this.ibots.forEach(bot => {
      const reaction = bot.react(payload)
      if(reaction !== '') reactions.push(reaction)
    })

    reactions.forEach(reaction => {
      this.server.emit(ChatGateway.CHANNEL, reaction)
    })
  }

  handleDisconnect(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    ChatGateway.LOGGER.log(`Déconnexion de ${socket.id}`)
    this.server.emit(ChatGateway.CHANNEL, `@${socket.id} offline`)
  }
}
