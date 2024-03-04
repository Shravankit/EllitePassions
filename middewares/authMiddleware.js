import JWT from "jsonwebtoken";
import userModal from "../modals/userModal.js";

export const requireSignin = async (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRECT);
        req.user = decode;
        next();
    }catch(error)
    {
        console.log(error);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModal.findById(req.user._id);
        if(user.role !== 1)
        {
            return res.status(401).send(
                {
                    success: true,
                    message: 'UnAuthorized User',
                }
            );
        }
        else
        {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send(
            {
                success: false,
                message: "error in admin middleware",
                error
            }
        )
    }
}