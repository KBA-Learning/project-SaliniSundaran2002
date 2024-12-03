const Router = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const authenticate = require("../middleware/authenticate.js")
const user = require('../models/User.js')
const { type } = require("os")
const { constants } = require("fs/promises")
const Training = require('../models/TrainingTasks.js'); 
const OnboardingTask = require('../models/OnboardTasks.js')
const UpdatedProfile = require('../models/updateUserProfile.js')
const { log } = require("console")
const { data } = require("react-router-dom")



dotenv.config()
const secretkey = process.env.secretkey

const adminRoute = Router()

adminRoute.get('/', (req, res) => {
    res.status(201).json({ message: "Hello World" })
    console.log("Hi");

})



adminRoute.post('/signup', async (req, res) => {
    try {
        const { FirstName, LastName, Email, Username, Password, Role, SignupDate } = req.body;


        const existingUser = await user.findOne({ email: Email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        console.log("hashed password: ", hashedPassword);


        // Create new user
        const newUser = new user({
            firstname: FirstName.trim(),
            lastname: LastName.trim(),
            email: Email,
            username: Username,
            password: hashedPassword,
            role: Role,
        });

        await newUser.save();
        console.log("User successfully registered:", newUser);

        res.status(201).json({ message: "User successfully registered.", user: newUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error.", error });
    }
});



// Login
//  create a schema
adminRoute.post("/login", async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the incoming request body

        const { Email, Password } = req.body;
        const User = await user.findOne({ email: Email });

        if (!User) {
            console.log("User not found");
            return res.status(401).json({ error: "Authentication failed - User doesn't exist" });
        }

        const passwordMatch = await bcrypt.compare(Password, User.password);
        if (!passwordMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ error: "Authentication failed - Password doesn't match" });
        }

        const token = jwt.sign({ userId: User._id, role: User.role }, secretkey, { expiresIn: "1h" });
        res.cookie("AuthToken", token, { httpOnly: true, sameSite: "strict" });

        console.log("Login success");
        return res.status(200).json({ status: true, message: "Login success", role: User.role });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Login failed" });
    }
});






// add notification
const notiSchema = mongoose.Schema({
    taskid: { unique: true, type: String },
    taskname: String,
    Details: String,
    Date: Date,
    // Recipient:String
})
const notiModel = mongoose.model("Notification", notiSchema)

adminRoute.post('/addNotification', authenticate, async (req, res) => {
    try {

        if (req.role == 'admin') {
            const { taskId, taskName, details, date, } = req.body
            const oldTaskid = await notiModel.findOne({ taskid: taskId })
            if (oldTaskid) {
                res.status(404).json({ message: "Already notification added in this taskid" })
                console.log("Already notification added in this notification id");

            } else {
                const notification = new notiModel({
                    taskid: taskId,
                    taskname: taskName,
                    Details: details,
                    Date: date,
                    // Recipient:recipient
                })
                notification.save()
                console.log(notification);

                res.status(200).json({ message: "Successfully notification added!" })
            }
        } else {
            res.status(404).json({ message: "You are not admin" })
        }

    } catch (error) {
        res.status(500).json({ message: "Internal error...." })
    }
})


// get notifications

adminRoute.get('/getNotifications', async (req, res) => {
    try {

        const notifications = await notiModel.find().sort({ createdAt: -1 }); // Sort by most recent

        if (notifications.length > 0) {

            res.status(200).json({
                notifications: notifications,
            });
        } else {

            res.status(404).json({
                message: 'No notifications found',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



adminRoute.delete('/deleteNotification/:taskid', authenticate, async (req, res) => {
    const notificationId = req.params.taskid
    try {
        const result = await notiModel.findOneAndDelete({ taskid: notificationId })
        if (!result) {
            return res.status(404).send("Nitification not found");
        }
        res.send("Notification deleted successfully");
    } catch (error) {
        res.status(500).send("error deleting data");
    }
})


// update notification

adminRoute.put('/updateNotification/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const updatedData = req.body; 
    console.log('Task ID:', taskId);
    console.log('Updated Data:', updatedData);

    try {
 
        const updatedNotification = await notiModel.findOneAndUpdate(
            { taskid: taskId }, 
            {
                taskname: updatedData.taskName,
                Details: updatedData.details,
                Date: new Date(updatedData.date) 
            },
            { new: true }  
        );

        console.log('Updated Notification:', updatedNotification);

        if (!updatedNotification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification updated', updatedNotification });

    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Error updating notification', error });
    }
});

// add onboarding tasks


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});



const upload = multer({ storage: storage });


// add onboarding task
adminRoute.post('/onTask', authenticate, upload.single('taskPdf'), async (req, res) => {
  try {
    const { taskTitle, taskDescription, startDate, endDate } = req.body;
    

    const existingTask = await OnboardingTask.findOne({ taskTitle });
    if (existingTask) {
      console.log("Task with this title already exists.");
      return res.status(400).json({ message: "Task with this title already exists." });
    }


    if (req.role !== 'admin') {
      console.log('Unauthorized access: Only admins can add onboarding tasks.');
      return res.status(403).json({ message: 'Unauthorized: Only admins can add onboarding tasks.' });
    }

    const taskPdf = req.file ? req.file.path : null;


    const newTask = new OnboardingTask({
      taskTitle,
      taskDescription,
      startDate,
      endDate,
      taskPdf
    });


    await newTask.save();

    console.log('Task added successfully');
    res.status(201).json({ message: 'Task added successfully', data: newTask });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: "Internal Server Error..." });
  }
});

// Get all onboarding tasks
adminRoute.get('/getOnboardingTasks',  async (req, res) => {
  try {

   
    const tasks = await OnboardingTask.find();


    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No onboarding tasks found.' });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error while fetching tasks.' });
  }
});

// Edit onboarding task
adminRoute.put('/editOnboardingTask/:taskName', authenticate, upload.single('taskPdf'), async (req, res) => {
  try {

    if (req.role !== 'admin') {
      console.log('Unauthorized access: Only admins can edit onboarding tasks.');
      return res.status(403).json({ message: 'Unauthorized: Only admins can edit onboarding tasks.' });
    }

    const { taskName } = req.params; 
    const {taskTitle, taskDescription, startDate, endDate } = req.body; 

  
    const existingTask = await OnboardingTask.findOne({ taskTitle:taskName });

    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    existingTask.taskTitle = taskTitle || existingTask.taskName;
    existingTask.taskDescription = taskDescription || existingTask.taskDescription;
    existingTask.startDate = startDate || existingTask.startDate;
    existingTask.endDate = endDate || existingTask.endDate;

    if (req.file) {
      existingTask.taskPdf = req.file.path; 
    }

 
    await existingTask.save();

    console.log('Task updated successfully');
    res.status(200).json({ message: 'Task updated successfully', data: existingTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error while updating task.' });
  }
});

// Delete onboarding task
adminRoute.delete('/deleteOnboardingTask/:taskTitle', authenticate, async (req, res) => {
  try {
    
    if (req.role !== 'admin') {
      console.log('Unauthorized access: Only admins can delete onboarding tasks.');
      return res.status(403).json({ message: 'Unauthorized: Only admins can delete onboarding tasks.' });
    }

    const { taskTitle } = req.params; 

    const deletedTask = await OnboardingTask.findOneAndDelete({ taskTitle });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    console.log('Task deleted successfully');
    res.status(200).json({ message: 'Task deleted successfully', data: deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error while deleting task.' });
  }
});



// add training course


adminRoute.post('/trainingTask', authenticate, upload.single('coursePdf'), async (req, res) => {
    try {
        const { courseTitle, courseDescription, assignedRole, duration, startDate, endDate } = req.body;


        console.log('Request body:', req.body);

        const existingCourse = await Training.findOne({ courseTitle: courseTitle });

        if (existingCourse) {
            console.log("Course with this title already exists.");
            return res.status(400).json({ message: "Course with this title already exists." });
        }

        if (req.role !== 'admin') {
            console.log('Unauthorized access: Only admins can add training tasks.');
            return res.status(403).json({ message: 'Unauthorized: Only admins can add training tasks.' });
        }

        const coursePdf = req.file ? req.file.path : null;


        const newCourse = new Training({
            courseTitle,
            courseDescription,
            assignedRole,
            duration,
            startDate,
            endDate,
            coursePdf
        });

        await newCourse.save();

        console.log('Course added successfully');
        res.status(201).json({ message: 'Course added successfully', data: newCourse });

    } catch (error) {
        console.error('Error adding course:', error.message);
        return res.status(500).json({ message: 'Server error, please try again' });
    }
});


// get all training tasks

adminRoute.get('/getTrainingTasks', async (req, res) => {
    try {
      const tasks = await Training.find(); 
      res.status(200).json({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Error occurred while fetching tasks.' });
    }
  });

// Update training task
adminRoute.put('/updateTrainingTask/:taskname', upload.single('coursePdf'), async (req, res) => {
  const { taskname } = req.params; 
  const { courseTitle, courseDescription, assignedRole, duration, startDate, endDate } = req.body; 
  const coursePdf = req.file ? req.file.path : null;

  try {
    
    const updatedTask = await Training.findOneAndUpdate(
      { courseTitle: taskname }, 
      { courseTitle, courseDescription, assignedRole, duration, startDate, endDate, coursePdf }, 
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }


    res.status(200).json({ message: 'Task successfully updated!', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error occurred while updating task.' });
  }
});


//   delete training tasks

adminRoute.delete('/deleteTrainingTask/:courseTitle', async (req, res) => {
    const { courseTitle} = req.params; 
  
    try {
    
      const deletedTask = await Training.findOneAndDelete({ courseTitle: courseTitle });
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found .' });
      }
  
      
      res.status(200).json({ message: 'Task successfully deleted!' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Error occurred while deleting task.' });
    }
  });
  

//   add Contact us

const contactSchema = mongoose.Schema({
    email:{type:String},
    phone:{type:Number},
    address:{type:String}
})
const Contact = mongoose.model("ContactUs",contactSchema)


adminRoute.post('/contact',async (req, res) => {
    const { email, phone, address } = req.body;
  

    if (!email || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const contactUs = new Contact({
        email:email,
        phone:phone,
        address:address
    })
    await contactUs.save();
  
    contactInfo = { email, phone, address };
  
    res.status(200).json({ message: 'Contact information updated successfully!' });
  });


//   view contact us

adminRoute.get('/getContactUs', async (req,res)=>{
    try {
        const contacts = await Contact.find(); 
        res.status(200).json({ contacts });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error occurred while fetching tasks.' });
      }
    });

//  view course

adminRoute.get('/getCourseDetails', async (req, res) => {
    const { title } = req.query;
  
    try {
      const course = await Training.findOne({ courseTitle: title });
      if (course) {
        res.status(200).json({ course });
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  // view total employees

  adminRoute.get('/viewTotalEmployees', async (req, res) => {
    try {
      const userRole = req.role;
      if (userRole !== 'admin') {
       
        const startOfMonth = new Date();
        startOfMonth.setDate(1);  
        startOfMonth.setHours(0, 0, 0, 0); 
  
      
        const employeeCount = await user.countDocuments({ role: { $ne: 'admin' } });
  
        
        const newEmployeesThisMonth = await user.countDocuments({
          role: { $ne: 'admin' },
          createdAt: { $gte: startOfMonth }
        });
  
        res.status(200).json({
          totalEmployees: employeeCount,
          newEmployeesThisMonth: newEmployeesThisMonth
        });
      } else {
        res.status(403).json({ message: "Access denied. Admin role can't view total employees." });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error.." });
    }
  });


 
// Route to get employees with filters, excluding admin role
adminRoute.get('/employeesList', async (req, res) => {
  const { role, month } = req.query;
  const filters = { role: { $ne: 'admin' } }; 
  if (role) {
    filters.role = role;
  }

  if (month) {
    const startDate = new Date(month);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1); 
    filters.joiningDate = { $gte: startDate, $lt: endDate };
  }

  try {

    const employees = await user.find(filters).select('firstname lastname role joiningDate'); 
    const count = await user.countDocuments(filters);


    res.status(200).json({ employees, count });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error occurred while fetching employees.' });
  }
});



// fetch userName

adminRoute.get('/userName', authenticate, async (req, res) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in request.' });
    }

    const User = await user.findById(userId); 
    if (!User) {
      return res.status(404).json({ message: 'User not found.' });
    }


    res.status(200).json({ username: User.firstname + " " + User.lastname });
  } catch (error) {
    console.error('Error fetching username:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// Route to get user info (including email and role)
adminRoute.get('/viewUser', authenticate, (req, res) => {
  try {

    const user = req.role;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        email: user.email,  
        role: user.role,    
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: "Server error" });
  }
});


// Route to fetch employee progress for training and onboarding tasks by email
adminRoute.get('/employeeProgress', async (req, res) => {
  const { username } = req.query; 

  if (!username) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {

    const employee = await user.findOne({username }, 'firstName lastName trainingTasks onboardingTasks');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }


    const trainingProgress = employee.trainingTasks.map(task => ({
      taskName: task.taskName,
      progress: task.progress,
    }));

    const onboardingProgress = employee.onboardingTasks.map(task => ({
      taskName: task.taskName,
      progress: task.progress,
    }));

    res.status(200).json({
      employeeName: `${employee.firstName} ${employee.lastName}`,
      trainingProgress,
      onboardingProgress
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress data' });
  }
});



// Update user profile (address, phone number, and profile picture)

adminRoute.put('/updateUser/:userEmail',  async (req, res) => {
  try {
    const userEmail = req.params.userEmail; // Email passed as a route parameter
    const { address, phoneNumber } = req.body;

    // Check if a file was uploaded and set the profilePic path
    // const profilePic = req.file ? req.file.path : null;

    // Fetch the user details matching the provided email
    const getDetails = await user.findOne({ email: userEmail }, 'firstname lastname email');

    // Validate if details are fetched
    if (!getDetails) {
      return res.status(404).json({ message: `No user found with email: ${userEmail}` });
    }

    const { firstname, lastname, email } = getDetails;

    // Update or create an entry in UpdatedProfile for the matched user
    const updatedData = await UpdatedProfile.findOneAndUpdate(
      { email }, // Match by email
      {
        firstname,
        lastname,
        email,
        address,
        phone: phoneNumber,
        // profilePic, // Use the uploaded file path
        updatedAt: new Date(),
      },
      { new: true, upsert: true } // Return updated document and create if not found
    );

    res.status(200).json({ message: 'Profile updated successfully' , updatedData});
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// fetch user email

adminRoute.get('/userEmail', authenticate, async (req, res) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in request.' });
    }


    const User = await user.findById(userId); 
    if (!User) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ email: User.email });
  } catch (error) {
    console.error('Error fetching user email:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


adminRoute.get('/userDetails/:email', async (req, res) => {
  try {
    const { email } = req.params; 
    const User = await user.findOne({ email });

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.json({
      firstname: User.firstname,
      lastname: User.lastname,
      
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});









  
  
  
  
  
  
  
  
























module.exports = adminRoute;