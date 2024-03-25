import { Injectable } from '@nestjs/common';
@Injectable()
export class AdminService {
  getUsers(): object {
    return {message: 'Hi admin'};
  }
  getUsersById(id:string): object {
    return {message: 'Your id is ' + id};

}
   getUsersByNameAndID(name: string, id: string): object{
    return {message: 'Your name is  ' +name + "and id is" +id};
   }
  addUser(myobj:object):object{
    return myobj;
   }
  updateUser(myobj:object):object{
    return myobj;
   }
}
