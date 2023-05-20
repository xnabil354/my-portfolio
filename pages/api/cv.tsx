import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function CVPage(req: NextApiRequest, res: NextApiResponse) {
    const filePath = 'D:/MY PROJECT/PortFolio-Kerja NextJS/public/CV/CV - Nabil Hafiyyan Zihni M.pdf';
    const fileStream = fs.createReadStream(filePath);
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="CV - Nabil Hafiyyan Zihni M.pdf"');
  
    fileStream.pipe(res);
  }
  
  import Link from 'next/link';

  const YourComponent: React.FC = () => {
    return (
      <Link href="/cv" passHref>
        <a>Download CV</a>
      </Link>
    );
  };
  
  export default YourComponent;