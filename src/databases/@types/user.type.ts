export interface IUser{
    name:string;
    email:string;
    phonenumber:string;
    password:string;
    profile?:string;
    isdeleted?:boolean;
    role?:string;
}