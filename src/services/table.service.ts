import { BaseCustomError } from "../utils/customError";
import { ITable } from "../databases/@types/table.type";
import { tableRepository } from "../databases/repositories/table.repository";
import { StatusCode } from "../utils/consts";

export class tableService {
  private tableRepo: tableRepository;
  constructor() {
    this.tableRepo = new tableRepository();
  }
  async createTable(data: ITable) {
    try {
      const table = await this.tableRepo.createTable(data);
      return table;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetAllTable() {
    try {
      const data = await this.tableRepo.GetAllTable();
      if (data.length <= 0) {
        throw new BaseCustomError("no table", StatusCode.NoContent);
      }
      return data;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async GetTable(tableId: string) {
    try {
      const data = await this.tableRepo.GetTable(tableId);
      if (!data) {
        throw new BaseCustomError("no table", StatusCode.NoContent);
      }
      return data;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async UpdateTable(tableId: string, data: ITable) {
    try {
      const updatedTable = await this.tableRepo.updateTable(tableId, data);
      return updatedTable;
    } catch (error: unknown | any) {
      throw error;
    }
  }
  
  async DeleteTable(tableId: string) {
    try {
      const deletedTable = await this.tableRepo.deleteTable(tableId);
      return deletedTable;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}
