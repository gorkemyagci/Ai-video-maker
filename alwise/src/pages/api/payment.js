import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;
    const locationId = 'LNPVYZYSQDJK9'; // Square Location ID
    const amount = 1; // $1.00

    try {
      const response = await axios.post(
        'https://connect.squareup.com/v2/payments',
        {
          source_id: token,
          amount_money: {
            amount,
            currency: 'USD',
          },
          location_id: locationId,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error.response.data);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  } else {
    res.status(404).json({ message: 'Invalid request method.' });
  }
}
