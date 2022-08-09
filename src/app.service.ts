import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): string {
    return "It's alive";
  }
}
