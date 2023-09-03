import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
@ApiTags('healthcheck')
export class AppController {
  @Get('health')
  getHello(@Res() res: Response): void {
    res.status(HttpStatus.OK).send();
  }
}
