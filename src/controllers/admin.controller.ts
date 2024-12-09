import { Body, Get, Header, Middlewares, Path, Post, Query, Route, SuccessResponse } from "tsoa";
import { IAdmin } from "../databases/@types/admin.type";
import { StatusCode } from "../utils/consts/status-code";
import { AdminService } from "../services/admin.service";
import { generateToken } from "../utils/generate";
import { validateInput } from "../middlewares/validate-input";
import { AdminSchema } from "../schemas/admin.schema";


@Route("/auth")
export class AdminController{

    private adminService: AdminService;

    constructor(){
        this.adminService = new AdminService();
    }

    @SuccessResponse(StatusCode.Created, "Create Success")
    @Post("/admin")
    @Middlewares(validateInput(AdminSchema))
    public async AdminSignup(@Body() requestBody:IAdmin): Promise<any>{
        try{

            const { email, password } = requestBody;
            const data = {
                email : email,
                password : password
            }
            
            const result = await this.adminService.AdminSignup(data);

            return {
                message : "Admin account created success",
                data : result
            }

        }catch(error: unknown | any){
            throw error;
        }
    }

    @SuccessResponse(StatusCode.OK, "Success")
    @Post("/admin-login")
    @Middlewares(validateInput(AdminSchema))
    public async AdminLogin(@Body() requestBody:IAdmin):Promise<any>{
        try{
            const { email, password } = requestBody;
            const data = {
                email : email,
                password : password
            }

            const admin = await this.adminService.Login(data);
            const respone = await this.GetAdminInfo(admin.id);

            const jwtToken = await generateToken(
                respone.data._id,
            );

            return { message: "Login successful.", token:jwtToken };
            
        }catch(error:unknown | any){
            throw error;
        }
    }

    // Get admin data by using ID
    @SuccessResponse(StatusCode.OK, "Success")
    @Get("/admin/{id}")
    public async GetAdminInfo(@Path() id:string):Promise<any>{
        try{

            const data = await this.adminService.FindAdminById(id)

            return {
                message : "admin has been found",
                data : data
            }
        }catch(error:unknown | any){
            throw error;
        }
    }
}