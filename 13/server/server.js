const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000
app.use(express.json());
app.use(cors());

// app.get('/users/filter', async (req,res)=>{
//     const {bloodGroup, age, gender, location} = req.query;
//     console.log('BloodGroup:',bloodGroup);
//     console.log('Gender:',gender);
//     console.log('Age:',age);
    
//     try {
//         const response = await axios.get('https://dummyjson.com/users');
//         const userData = await response.data;
//         // const result = userData.users.filter((item) => {
//         //     if (gender && item.gender === gender) {
//         //         return true;
//         //       }
              
//         // }
//          // Filter users based on criteria
//     const result = userData.users.filter((user) => {
//         // Check gender if provided
//         if (gender && user.gender !== gender) {
//           return false;
//         }
  
//         // Check blood group if provided
//         if (bloodGroup && user.bloodGroup !== bloodGroup) {
//           return false;
//         }
  
//         // Check location if provided
//         if (location && user.location !== location) {
//           return false;
//         }
  
//         // Check age if provided
//         if (age && user.age !== age) {
//           return false;
//         }
  
//         return true; // User matches all provided criteria
//       });
        
       
//         res.json(result);
        
//     } catch (error) {
//         console.error('Error:',error);
//         return res.status(500).json({error:error.message})
        
//     }
// })
app.get('/users/filter', async (req, res) => {
    const { bloodGroup, age, gender, location } = req.query;
        console.log('BloodGroup:',bloodGroup);
    console.log('Gender:',gender);
    console.log('Age:',age);
  
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const userData = await response.data;
  
      // Decode blood group if provided
      const decodedBloodGroup = bloodGroup ? decodeURIComponent(bloodGroup) : null;
  
      // Filter users based on criteria
      const filteredUsers = userData.users.filter((user) => {
        // Check gender if provided
        if (gender && user.gender !== gender) {
          return false;
        }
  
        // Check blood group if provided
        if (decodedBloodGroup && user.bloodGroup !== decodedBloodGroup) {
          return false;
        }
  
        // Check location if provided
        if (location && user.location !== location) {
          return false;
        }
  
        // Check age if provided
        if (age && user.age !== age) {
          return false;
        }
  
        return true; // User matches all provided criteria
      });
  
      res.json(filteredUsers);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)

})