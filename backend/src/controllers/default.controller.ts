import { Controller, Get } from '@nestjs/common';

@Controller()
export class DefaultController {
  @Get()
  healthCheck() {
    return {
      running: 'OK',
      message: 'ᕕ(⌐■_■)ᕗ It work! ♪♬',
    };
  }
}
