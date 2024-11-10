import { Router } from "express";
import { user,onTaskModel,trainingModel,notiModel } from "./adminRoute.js";
import mongoose from "mongoose";
import { authenticate } from "../Middleware/auth.js";



const userRoute = Router();
// const userInfo = await user.findOne({Username:username});

userRoute.get('/editProfile',(req,res)=>{
    res.send("testing....")
   console.log(user.find({}));
   

console.log(user);
})

userRoute.get('/userDetails/:username', async (req,res)=>{
    const search = req.params.username

    console.log("Username parameter received:", search);
    try{
        
        
        const data = await user.findOne({username:search})
        if(!data){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user details" });
    }
})


// edit employee profile

userRoute.patch("/editProfile",authenticate,async (req,res)=>{

   

    

    try{
        const {firstname,lastname,email,address,phoneno,username}=req.body

        const data=  await  user.findOne({username})
        if(data.Role != 'admin'){
            const editProfile= await user.updateOne(
                {username},
                {$set:{firstname,lastname,email,address,phoneno}}
            )
            res.status(200).json({message:"Profile updated successfully",editProfile})

        }

    } catch(err){
        res.status(500).json({message:"Internal server error....."})
    }
})


// view the Notification

userRoute.get("/viewNotification",async (req,res)=>{
try{
const notifications = await notiModel.find()
if(notifications.length>0){
    res.status(200).json({ message: "Notifications fetched successfully", notifications });
}else {
    res.status(404).json({ message: "No notifications found" });
}
} catch(err){
    res.status(500).json({ message: "Internal server error" });
}
})


// View all onboarding task

userRoute.get("/viewOnboardingTask",async(req,res)=>{
    try{

        const onboardingTask = await onTaskModel.find()
        if(onboardingTask.length>0){
            res.status(200).json({ message: "Onboarding Task fetched successfully", onboardingTask });
        } else{
            res.status(404).json({ message: "No onboarding task found" });
        }
    } catch(err){
        res.status(500).json({ message: "Internal server error" });
    }
})

// view all training tasks

userRoute.get("/viewTrainingTask", async(req,res)=>{
    try{
const trainingTask = await trainingModel.find()
if(trainingTask.length>0){
    res.status(200).json({ message: "Training Task fetched successfully", trainingTask });
} else{
    res.status(404).json({ message: "No training task found" });
}
    } catch(err){
        console.error("Logout Error:", err);
        res.status(500).json({message:"Internal server error during logout"})
    }
})

// view training task by role 
userRoute.get("/viewTrainingRole", authenticate, async (req,res)=>{
    const userRole = req.Role
    let TrainingTasks;
    if(userRole == 'admin'){
        TrainingTasks = await trainingModel.find()
    }
        else{
        TrainingTasks = await trainingModel.find({AssignedRole:userRole})
    }

    if(TrainingTasks.length>0){
        return res.status(200).json(TrainingTasks)
    } else{
        return res.status(404).json({ message: "No tasks found for your role." });

    }
    
})


// Logout

userRoute.post("/logout",async (req,res)=>{
    try{
        res.clearCookie('authToken');
        res.status(200).json({message: "Logged out successfully"})

    } catch(err){
        console.error("Logout Error:", err);
        res.status(500).json({message:"Internal server error during logout"})
    }
})






export {userRoute}