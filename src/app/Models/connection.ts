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
  dataset: { collectionName: string; status: boolean };
  uri?: string;
  status: string;
  updatedAt: string;
}

export interface IConnectionInfo {
  categoryInfo: CategoryType;
  dataSetInfo: IConnection;
}
