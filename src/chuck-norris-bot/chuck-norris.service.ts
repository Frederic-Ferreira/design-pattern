import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IBot } from 'src/bots-module/Ibot-interface';

@Injectable()
export class ChuckNorris implements IBot {
  constructor(private readonly httpService: HttpService) {}

  public async hello(): Promise<string> {
        const response = await this.httpService.axiosRef.get('https://api.chucknorris.io/jokes/random')
        console.log(response.data.value)
        return response.data.value
  }

  public react(message: string): string{
    if(message.includes('bagarre')) return 'Chuck Norris ne perd jamais, il a simplement parfois pitié de son adversaire'
    return ""
}
}
