import changeStatus from "../../../functions/changeStatus";
const handler = async (req, res) => {
    if (req.method === 'POST') {
      try {
        const id = req.body.id
        try{
            setTimeout(async () => {
            await changeStatus('searching', `${id}`);
        }, 2000); 
        }catch(err){
            console.log(err)
        }
        
        res.status(200).json("user with ID " + id + "is searching");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(405).end();
    }
  };
  
  export default handler;