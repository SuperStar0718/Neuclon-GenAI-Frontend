import { CategoryType } from "src/app/Models/category-type";

export interface IConnection {
  _id: number;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  dbname?: string;
  tables: string;
  dataset: string;
  uri?: string;
  status: string;
  updated_at: string;
}

export interface IConnectionInfo {
  categoryInfo: CategoryType;
  dataSetInfo: IConnection;
}
