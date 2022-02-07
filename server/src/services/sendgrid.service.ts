import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import { SendgridMessage } from 'src/types/sendgrid';

@Injectable()
export class SendgridService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('sendgrid.apiKey'));
  }

  async sendMail(msg: SendgridMessage) {
    return sgMail.send(msg);
  }
}
