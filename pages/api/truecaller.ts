// @ts-ignore
import * as truecallerjs from 'truecallerjs';
import type { NextApiRequest, NextApiResponse } from 'next';

interface MyResponse {
  status: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<MyResponse>): Promise<void> {
  // Check if nomorCode and countryCode are provided
  const nomorCode = req.query.nomorCode as string;
  const countryCode = req.query.countryCode as string;
  if (!nomorCode || !countryCode) {
    return res.status(400).json({
      status: 'error',
      message: 'Both nomorCode and countryCode are required!',
    });
  }

  const creator = "xzhndvs";

  const searchData = {
    number: nomorCode,
    countryCode: countryCode,
    installationId: "a1i0N--ZtzzhIk_k_gN90VfTZjxmsTzt_5qiBX6pCXTp4EFfZUkZE6mDb6OlXQXR",
  } as const;

  try {
    const data = await truecallerjs.searchNumber(searchData);
    
    // Return success response with the response and data
    const response: MyResponse = {
      status: 'success',
      message: 'Your request was successful!'
    };
    // @ts-ignore
    res.status(200).json({ creator, response, data: data });
  } catch (err: unknown) {
    res.status(500).json({
      status: 'error',
      // @ts-ignore
      message: typeof err === 'string' ? err : err?.message || 'Internal Server Error',
    });
  }
}