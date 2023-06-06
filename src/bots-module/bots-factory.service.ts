import { Injectable } from '@nestjs/common';
import { IBot } from './Ibot-interface';
import { Groom } from './groom';
import { ChuckNorris } from 'src/chuck-norris-bot/chuck-norris.service';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class BotFactoryService {
    constructor(private http: HttpService){}

  createBots(number: number): IBot[] {
    const createdBots = []
    for(let x = 0; x < number; x++){
        const randomIndex = Math.floor(Math.random() * 2);
        switch (randomIndex){
          case 0: 
          createdBots.push(new Groom())
          break;

          case 1:
            createdBots.push(new ChuckNorris(this.http))
            break;
        }
    }
    return createdBots
  }
}