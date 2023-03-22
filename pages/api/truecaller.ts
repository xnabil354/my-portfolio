// @ts-ignore
import * as truecallerjs from 'truecallerjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const nomorCode = req.query.nomorCode as string | undefined;
  const countryCode = req.query.countryCode as string | undefined;
  const creator = "xzhndvs";

  if (!nomorCode) return res.status(400).json({ error: `Input Parameter Nomor` });
  if (!countryCode) return res.status(400).json({ error: `Input Parameter Country Code Example ID / MY` });

  const searchData = {
    number: nomorCode,
    countryCode: countryCode,
    installationId: "a1i0N--ZtzzhIk_k_gN90VfTZjxmsTzt_5qiBX6pCXTp4EFfZUkZE6mDb6OlXQXR",
  };

  truecallerjs.searchNumber(searchData).then(data => {
      res.status(200).json({
        creator: `${creator}`,
        status: true,
        result: data
      });
    }).catch(() => {
      res.status(500).json({ error: 'failed to load data' });
    });
};