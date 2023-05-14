import type { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import { Client, IncomingPhoneNumberInstance } from 'twilio';
//@ts-ignore
import { deno } from 'deno';

interface MyResponse {
  status: string;
  code: number;
  message: string;
}

async function get_balance(acc_key: string, acc_sec: string): Promise<string> {
  try {
    let client = new Client(acc_key, acc_sec);
    let { balance, currency } = client.balance.fetch();
    let waarde = `${balance} ${currency}`;
    return waarde;
  } catch (e) {
    return 'BAD_TWILIO';
  }
}

async function get_phone(acc_key: string, acc_sec: string): Promise<string> {
  try {
    let client = new Client(acc_key, acc_sec);
    let [record] = (await client.incomingPhoneNumbers.list({
      limit: 20,
    })) as IncomingPhoneNumberInstance[];
    return record.phoneNumber;
  } catch (e) {
    return 'BAD_TWILIO';
  }
}

async function get_type(acc_key: string, acc_sec: string): Promise<string> {
  try {
    let client = new Client(acc_key, acc_sec);
    let { type } = await client.api.accounts(acc_key).fetch();
    return type;
  } catch (e) {
    return 'BAD_TWILIO';
  }
}

async function get_status(acc_key: string, acc_sec: string): Promise<string> {
  try {
    let client = new Client(acc_key, acc_sec);
    let { status } = await client.api.accounts(acc_key).fetch();
    return status;
  } catch (e) {
    return 'BAD_TWILIO';
  }
}

async function smsSend(acc_key: string, acc_sec: string, nummer: string): Promise<string> {
  try {
    let client = new Client(acc_key, acc_sec);
    await client.messages.create({
      from: nummer,
      body: 'Testing',
      to: '+12707397227',
    });
    return 'TWILIO_SMS_SEND';
  } catch (e) {
    return 'TWILIO_SMS_FAILED';
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MyResponse>,): Promise<void> {
  async function TwilioChecker(key: string) {
    try {
      key = key.trim();
      let acc_key = key.split('|')[0];
      let acc_sec = key.split('|')[1];

      let balance = await get_balance(acc_key, acc_sec);
      if (balance === 'BAD_TWILIO') {
        res.status(420).json({
          status: 'error',
          code: 420,
          // @ts-ignore
          message: typeof err === 'string' ? err : err?.message || 'Sorry Your Twilio Key is Bad!!',
        });
      }
      

      let nummer = await get_phone(acc_key, acc_sec);
      let types = await get_type(acc_key, acc_sec);
      let status = await get_status(acc_key, acc_sec);

      let build = `TWILIO_SID: ${acc_key}\nTWILIO_SECRET: ${acc_sec}\nBALANCE: ${balance}\nFROM_NUMBER: ${nummer}\nTYPE: ${types}\nSTATUS: ${status}`;
      let test_sms = await smsSend(acc_key, acc_sec, nummer);

      if (test_sms === 'TWILIO_SMS_SEND') {
        let twilio_send = deno.open('Result/twilio_hit.txt', { write: true, append: true });
        let remover = build.replace('\r', '');
        twilio_send.write(new TextEncoder().encode(`${remover}\n\n`));
        twilio_send.close();
        // Return success response with the response and data
        let response: MyResponse = {
          status: 'success',
          code: 200,
          message: 'Good Key!',
        };
        // @ts-ignore
        res.status(200).json({ creator, response, data: key });
        
        console.log(`\n---> ${key} WORK SEND SMS!`);
      } else {
        res.status(500).json({
          status: 'error',
          code: 500,
          // @ts-ignore
          message: typeof err === 'string' ? err : err?.message || 'Internal Server Error',
        });
        console.log(`\n---> ${key} BAD!`);
      }
    } catch {
      res.status(500).json({
        status: 'error',
        code: 500,
        // @ts-ignore
        message: typeof err === 'string' ? err : err?.message || 'Internal Server Error',
      });
      console.log(`\n---> ${key} BAD!`);
    }
  }
}
