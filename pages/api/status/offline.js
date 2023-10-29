import changeStatus from "../../../functions/changeStatus";
const handler = async (req, res) => {
    if (req.method === 'POST') {
      try {
        const data = JSON.parse(req.body);
        console.log(data.id)
        await changeStatus('offline', `${data.id}`);
        res.status(200).json("user with ID " + data.id + "is offline");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(405).end();
    }
  };
  
  export default handler;