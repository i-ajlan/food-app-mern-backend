import express,{Request, Response} from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import userRouter from './routers/userRouter'

const app = express()


app.use(express.json())
app.use(cors())
app.use('/api/v1/my/user/', userRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/health', (req:Request, res:Response)=>{
  res.send({message:"health ok!"})
})

const port = process.env.PORT  || 3000 

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(()=>console.log("Connected to Database"))
    .catch((err)=>console.log(err));


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})