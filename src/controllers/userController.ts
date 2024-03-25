import {NextFunction, Request, Response} from 'express'
import User from '../schemas/userSchema'

const createCurrentUser = async (req:Request, res:Response) => {
    try {
        const existingUser = await User.findOne(req.body);
        if(existingUser){
            res.status(200).json({message:'User Already existed'})
        }
        else{
            const user = await User.create(req.body);
            await user.save();
            console.log({"user": user, "userType": typeof user});
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Can't create user or it's already exist"})
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req

        const existingUser = await User.findById(userId)
      
        if(existingUser){
           res.status(200).json(existingUser) ; 
        }else{
            res.status(500).json({message: "We haven't found that user"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Problem with getting current user"})
    }
}

const updateCurrentUser=async (req:Request, res:Response) =>{
     const {userId} = req;
    const {name, addressLine1, city, country} = req.body
     try {
        const user = await User.findById(userId);

        if(!user){
            throw new Error("User not found");
        }

        user.name = name
        user.addressLine1 = addressLine1
        user.city = city
        user.country = country 

        await user.save()
        res.sendStatus(200)

        
     } catch (error) {
        console.log(error)
        res.status(501).json({message: "Prob with updating user"})
     }
}

export default {createCurrentUser, getCurrentUser, updateCurrentUser}