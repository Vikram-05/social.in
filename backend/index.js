import dotenv from 'dotenv'
dotenv.config()
import  {app}  from './src/app.js'

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is listen at port ${PORT}`);
})