import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserEntity } from '../entities/user.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class WhoIsService {
    private users: { [ip: string]: UserEntity } = {}

  constructor(private readonly httpService: HttpService) {}

  async get(socket: Socket): Promise<UserEntity> {
    const ip = socket.client.conn.remoteAddress;
    if(!(ip in this.users)){
        const response = await this.httpService.axiosRef.get('https://randomuser.me/api/')
        const profil = response.data.results[0]
        const name = profil.name.first
        const user = new UserEntity(ip, socket.id, name)
        this.users[ip] = user
    }

    return this.users[ip]
  }
}
