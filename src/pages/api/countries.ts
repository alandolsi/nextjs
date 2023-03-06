import type { NextApiRequest, NextApiResponse } from 'next'

// restcountires.com API
const url = 'https://restcountries.com/v3.1/all'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(url)
  const data = await response.json()
  res.status(200).json(data)
}









