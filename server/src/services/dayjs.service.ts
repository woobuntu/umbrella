import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

@Injectable()
export class DayjsService {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Seoul');
  }

  getCurrentTime() {
    return dayjs().add(9, 'hour').toDate();
  }

  convertGMT(date: Date | string) {
    return dayjs(date).add(9, 'hour').toDate();
  }
}
