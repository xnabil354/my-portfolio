// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import FormData from "form-data"

type Response = {
  status: string;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // @ts-ignore
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'error',
      message: 'Method is not allowed!',
    });

  const form = new FormData();
  const body = JSON.parse(req.body);
  form.append('name', body.name);
  form.append('email', body.email);
  form.append('subject', body.subject);
  form.append('message', body.message);

  //  GET YOUR GOOGLESHEETS ID AND PASTE HERE!
  //  timestamp, name, email, subject, message
  //  TUTORIAL: https://github.com/jamiewilson/form-to-google-sheets / https://www.youtube.com/watch?v=2XosKncBoQ4

  const GOOGLE_SHEETS_ID = "AKfycbzREywTLx36_T9bdc6nOtDqXVxN82katBJJmv6CJaESteWC7JcqnocTG66FkjW-fh6I5g"

  fetch(`https://script.google.com/macros/s/${GOOGLE_SHEETS_ID}/exec`, {
    method: 'POST',
    // @ts-ignore
    body: form,
  })
    .then(() => res.status(200).send({ status: 'ok', message: 'Success!' }))
    .catch((err: Error) =>
      res.status(500).send({
        status: 'error',
        message: err.message || 'Internal Server Error',
      }),
    );
}
