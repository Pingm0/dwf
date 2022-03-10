const mongoose = require('mongoose')

mongoose.connect(process.env.FOODDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection is Established to the DWF DB"))
    .catch((err) => console.log("Something went wrong when connecting to DWF DB",err))