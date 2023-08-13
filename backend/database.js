const mongoose =require('mongoose');
const mongoURL = 'mongodb+srv://rishikush31:chotubadu12345@cluster0.iabul5f.mongodb.net/Notes?retryWrites=true&w=majority';

const dbconnect=async()=>{
    mongoose.set('strictQuery',true);
    await mongoose.connect(mongoURL).then(()=>{
        console.log("Database connection successfull");
    })
    .catch((err)=>{
        console.error(err.message);
    });
}
module.exports=dbconnect;