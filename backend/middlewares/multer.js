import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cd(null,'./public/uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage:storage});

export default upload;