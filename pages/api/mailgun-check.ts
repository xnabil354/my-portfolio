// @ts-ignore
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface MyResponse {
  status: string;
  code: number;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MyResponse>, ): Promise<void> {
  let key = req.query.key as string;
  let domain = req.query.domain as string;
  let to_mail = req.query.to_mail as string;
  if (!key || !domain || !to_mail) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid Parameter! Please check again!',
    });
  }

  let creator = 'xzhndvs';

  try {
    let mailgunHit = await axios.post(`https://api.mailgun.net/v3/${domain}/messages`,
      {
        from: `Support <mailgun@${domain}>`,
        to: to_mail,
        subject: 'Test mailgun',
        text: 'Testing mailgun',
      },
      {
        auth: {
          username: 'api',
          password: `${key}`,
        },
      },
    );

    // Return success response with the response and data
    let response: MyResponse = {
      status: 'success',
      code: 200,
      message: 'Your request was successful!',
    };
    // @ts-ignore
    res.status(200).json({ creator, response, data: mailgunHit.data });
  } catch (err: unknown) {
    res.status(500).json({
      status: 'error',
      code: 500,
      // @ts-ignore
      message: typeof err === 'string' ? err : err?.message || 'Internal Server Error',
    });
  }
}
