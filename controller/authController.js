import userModal from "../modals/userModal.js";
import { hashPassword, comparePassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";

//register logic
export const registrationController = async (req, res) => {
    try {
        const {name, email, password, phone, answer, address} = req.body;

        if(!name)
        {
            return res.status(401).send({message: 'Name required'});
        }
        if(!email)
        {
            return res.status(401).send({message: 'Email required'});
        }
        if(!password)
        {
            return res.status(401).send({message: 'Password required'});
        }
        if(!phone)
        {
            return res.status(401).send({message: 'Phone required'});
        }
        if(!answer)
        {
            return res.status(401).send({message: 'Answer required'});
        }
        if(!address)
        {
            return res.status(401).send({message: 'Address required'});
        }

        //existing user
        const existingUser = await userModal.findOne({email});

        if(existingUser)
        {
            return res.status(200).send({
                success: true,
                message: 'user already exists',
            });
        }

        //hashing password
        const hashedPassword = await hashPassword(password);

        const user = await new userModal({
            name,
            email,
            password: hashedPassword,
            phone,
            answer,
            address,
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Registered Succesful',
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'error in registration',
            error
        })
    }
};



//login logic
export const loginController = async (req, res) => {
    try {
        const  {email, password} = req.body;

        //validation check or user exist or not check
        if(!email || !password)
        {
            return res.status(201).send({
                success: false,
                message: 'invalid Email or Password',
            });
        }

        const user = await userModal.findOne({email});
        if(!user)
        {
            return res.status(200).send({
                success: false,
                message: 'Email not Registered',
            });
        }

        const match = await comparePassword(password, user.password);

        if(!match)
        {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password',
            });
        }

        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRECT, {expiresIn: '7d'});

        res.status(200).send({
            success: true,
            message: 'login Succesful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        }); 
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body;

        if(!email)
        {
            res.status(401).send({message: 'Email is Required'});
        }

        if(!answer)
        {
            res.status(401).send({message: 'Answer is Required'});
        }

        if(!newPassword)
        {
            res.status(401).send({message: 'New Password is Required'});
        }

        //check user
        const user = await userModal.findOne({email, answer});

        if(!user && !answer)
        {
            res.status(404).send({
                success:false,
                message: 'Email or Answer is not Valid',
            });
        }

        const hashednewPassword = await hashPassword(newPassword);

        await userModal.findByIdAndUpdate(user._id, {password: hashednewPassword});

        res.status(200).send(
            {
                success: true,
                message: 'Password Has Changed Succesfully',
            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: 'Resetting Passwrod Failed',
                error,
            }
        )
    }
}


// get all users controller
export const allUsersController = async (req, res) => {
    try {
        const allUsers = await userModal.find({});
        res.status(200).send(
            {
                success: true,
                message: "Fetched All Users",
                allUsers,
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                success: false,
                message: "error in getting Users",
                error,
            }
        )
    }
}

export const testController = async (req, res) => {
    console.log('protected controller');
    res.status(200).send({
        message: 'protected Route',
    });
}