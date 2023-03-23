// @ts-ignore
import * as truecallerjs from 'truecallerjs';
import type { NextApiRequest, NextApiResponse } from 'next';

interface MyResponse {
  status: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MyResponse>): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      message: 'Method is not allowed!',
    });
  }

  const nomorCode = req.query.nomorCode as string;
  const countryCode = req.query.countryCode as string;
  const creator = "xzhndvs";

  const searchData = {
    number: nomorCode,
    countryCode: countryCode,
    installationId: "a1i0N--ZtzzhIk_k_gN90VfTZjxmsTzt_5qiBX6pCXTp4EFfZUkZE6mDb6OlXQXR",
  } as const;

  try {
    const data = await truecallerjs.searchNumber(searchData);
    // @ts-ignore
    res.status(200).json({ status: 'ok', message: 'Success!', data: data });
  } catch (err: unknown) {
    res.status(500).json({
      status: 'error',
      // @ts-ignore
      message: typeof err === 'string' ? err : err?.message || 'Internal Server Error',
    });
  }
}