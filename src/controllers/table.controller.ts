import { StatusCode } from "../utils/consts";
import { ITable } from "../databases/@types/table.type";
import { tableService } from "../services/table.service";
import {
  Body,
  Get,
  Header,
  Middlewares,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Request,
  Put,
  Delete,
  Tags
} from "tsoa";

@Route("/table")
@Tags("Table")
export class TableController {
  private tableservice: tableService;

  constructor() {
    this.tableservice = new tableService();
  }

  @SuccessResponse(StatusCode.Created, "Created Success")
  @Post("/")
  public async createTable(@Body() requestBody: ITable): Promise<any> {
    try {
      const data = await this.tableservice.createTable(requestBody);
      return {
        message: "Table created successfully",
        data: data,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "Success")
  @Get("/")
  public async GetAllTable(): Promise<any> {
    try {
      const data = await this.tableservice.GetAllTable();
      return {
        message: "Table found!!",
        data: data,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "Success")
  @Get("/{tableId}")
  public async GetTable(@Path() tableId: string): Promise<any> {
    try {
      const data = await this.tableservice.GetTable(tableId);
      return {
        message: "Table found!!",
        data: data,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "Success")
  @Put("/{tableId}")
  public async UpdateTable(
    @Path() tableId: string,
    @Body() requestBody: ITable
  ): Promise<any> {
    try {
      const data = await this.tableservice.UpdateTable(tableId, requestBody);
      return {
        message: "Table updated successfully",
        data: data,
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, "Success")
  @Delete("/{tableId}")
  public async DeleteTable(@Path() tableId: string): Promise<any> {
    try {
      const data = await this.tableservice.DeleteTable(tableId);
      return {
        message: "Table deleted successfully",
      };
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
