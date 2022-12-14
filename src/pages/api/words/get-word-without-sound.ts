
import HTTPError from 'http-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextHandler } from 'next-connect';


interface ThrownError {
    name: string,
    code: number
}



const route = nextConnect({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send("Not Found");
  },
  onError: (err: ThrownError, req: NextApiRequest, res: NextApiResponse) => {

    res.status(err.code).send({ error: err.name });
  },
});



route.get(async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  
  const word = {
    ar: "أنا",
    en: "I",
    file_name: "64cdd16c-dc84-4695-8095-2f33c1734637.web",
    sound_id: "7a16995e-b721-4fb5-ab3e-14ec479923fe",
    word_id: "1379fef1-34eb-47e4-88d9-c5ac519afcce",
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      res.json(word)
      res.end()
    }, 2000)
  })

  
});

export default route;
