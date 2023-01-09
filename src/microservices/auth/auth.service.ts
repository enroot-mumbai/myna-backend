import * as userModel from '../user/user.repository';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, UnprocessableEntityError } from '../../utils/error-handler';
import * as otpUtil from '../../utils/otp';
// import { sendSMS } from '../common/communications/sendSMSWithTwillio';
import bcrypt from 'bcryptjs';

// import { sendEmailUsingNodemailer } from '../common/communications/sendEmailUsingNodemailer';


export async function login(email: string, phone: string, password: string) {
  let user;

  // Check whether the user is trying to login with email or phone
  if (email) {
    user = await userModel.getUserByEmail(email);
  } else if (phone) {
    user = await userModel.getUserByPhone(phone);
  }

  // If no user found, throw error
  if (!user) {
    throw new BadRequestError('Invalid email or phone');
  }

  // Check if password is correct or not
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new UnauthorizedError('Invalid password');
  }

  // If password is correct return user and token
  // TODO: Return token as well 
  return user;
}

export async function signup(email: string, phone: string, password: string) {
  let user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = otpUtil.generateOTP();


  // TODO - Add validations for phone number and email

  // User signup with Email
  if (email) {
    user = await userModel.getUserByEmail(email);

    if (user) {
      throw new ConflictError('Email already in use');
    }

    console.log('Your OTP is', otp)
    // sendEmailUsingNodemailer(email, 'Verification OTP', `Your OTP is ${otp}`);

    user = await userModel.createUserWithEmail(
      email,
      hashedPassword,
    );
  }
  // User signup with Phone
  else if (phone) {
    user = await userModel.getUserByPhone(phone);

    if (user) {
      throw new ConflictError('Phone number already in use');
    }

    console.log('Your OTP is', otp)

    // sendSMS(phone, `Your OTP is ${otp}`);

    user = await userModel.createUserWithPhone(
      phone,
      hashedPassword,
    );
  }

  return user;
}

// export async function verifyOTP(email: string, phone: string, otp: string) {
//   let user;

//   if (email) {
//     user = await userModel.getUserByEmail(email);

//     if (!user) {
//       throw new UnprocessableEntityError('Invalid email');
//     }

//     if (user.emailOTP !== otp) {
//       throw new UnprocessableEntityError('Invalid OTP');
//     }

//     await userModel.updateUserByID(user.id, {
//       emailVerified: true,
//       emailOTP: null,
//     });
//   } else if (phone) {
//     user = await userModel.getUserByPhone(phone);

//     if (!user) {
//       throw new UnprocessableEntityError('Invalid phone number');
//     }

//     if (user.phoneOTP !== otp) {
//       throw new UnprocessableEntityError('Invalid OTP');
//     }

//     await userModel.updateUserByID(user.id, {
//       phoneVerified: true,
//       phoneOTP: null,
//     });
//   }
// }

// export async function forgotPassword(email: string, phone: string) {
//   let user;

//   if (email) {
//     user = await userModel.getUserByEmail(email);

//     if (!user) {
//       throw new UnprocessableEntityError('Invalid email');
//     }

//     const otp = otpUtil.generateOTP();
//     console.log('Your OTP is', otp)
//     // sendEmailUsingNodemailer(email, 'Reset Password OTP', `Your OTP is ${otp}`);

//     await userModel.updateUserByID(user.id, { resetPasswordOTP: otp });
//   } else if (phone) {
//     user = await userModel.getUserByPhone(phone);

//     if (!user) {
//       throw new UnprocessableEntityError('Invalid phone number');
//     }

//     const otp = otpUtil.generateOTP();
//     console.log('Your OTP is', otp)
//     // sendSMS(phone, `Your OTP is ${otp}`);

//     await userModel.updateUserByID(user.id, { resetPasswordOTP: otp });
//   }
// }

// export async function resetPassword(email: string, phone: string, otp: string, newPassword: string) {
//   let user;

//   if (email) {
//     user = await userModel.getUserByEmail(email);

//     if (!user) {
//       throw new UnprocessableEntityError('Invalid email');
//     }

//     if (user.resetPasswordOTP !== otp) {
//       throw new UnprocessableEntityError('Invalid OTP');
//     }

//     await userModel.updateUserByID(user.id, {
//       password: newPassword,
//       resetPasswordOTP: null,
//     });
//   } else if (phone) {
//     user = await userModel.getUserByPhone(phone);

//     if (!user) {
//       throw new UnprocessableEntityError('Invalid phone number');
//     }

//     if (user.resetPasswordOTP !== otp) {
//       throw new UnprocessableEntityError('Invalid OTP');
//     }

//     await userModel.updateUserByID(user.id, {
//       password: newPassword,
//       resetPasswordOTP: null,
//     });
//   }
// }