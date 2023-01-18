import * as userModel from './user.repository';

export async function updateUserService(userId:string, data:any) {
  let user;

  user = await userModel.updateUserByID(userId, data);
  
  // TODO: Return token as well 
  return user;
}

export async function getUser(userId:string) {
  let user;
  user = await userModel.getUserById(userId, null);
  return user;
}