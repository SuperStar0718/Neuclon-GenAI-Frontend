import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, from, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ChatCompletionRequestMessage } from "openai";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  headers: HttpHeaders;
  options: any;
  tokenSubject = new BehaviorSubject<string>(localStorage.getItem("token")!);
  token: any;
  public baseUrl!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.headers = new HttpHeaders({ Authorization: this.token });
    this.options = { headers: this.headers, observe: "response" };
    this.baseUrl = environment.backendUri;
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  establishConnection(connectionData: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/connect", connectionData)
      .pipe(catchError(this.handleError));
  }

  connectTables(connectionData: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/connectTables", connectionData)
      .pipe(catchError(this.handleError));
  }

  getAllConnections(): Observable<any> {
    return this.http
      .get(this.baseUrl + "/api/getAllConnections")
      .pipe(catchError(this.handleError));
  }

  getJoinedTableData(connectedNodes: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/getJoinedTableData", connectedNodes)
      .pipe(catchError(this.handleError));
  }

  refreshConnection(connectionData: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/refreshConnection", connectionData)
      .pipe(catchError(this.handleError));
  }

  stopConnection(connectionData: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/stopConnection", connectionData)
      .pipe(catchError(this.handleError));
  }

  deleteConnection(connectionData: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/deleteConnection", connectionData)
      .pipe(catchError(this.handleError));
  }

  generateResponseFromChatGPT(req: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/chatgpt/generateResponseFromChatGPT", req)
      .pipe(catchError(this.handleError));
  }

  sendMessage(message: ChatCompletionRequestMessage[]): Observable<any> {
    return this.http
      .post(this.baseUrl + "/chatgpt/sendMessage", message)
      .pipe(catchError(this.handleError));
  }

  getData(databaseInfo: JSON): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/getData", databaseInfo)
      .pipe(catchError(this.handleError));
  }

  saveData(data: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/saveData", data)
      .pipe(catchError(this.handleError));
  }

  deleteData(data: any): Observable<any> {
    return this.http
      .post(this.baseUrl + "/api/deleteData", data)
      .pipe(catchError(this.handleError));
  }

  getDatabaseList(): Observable<any> {
    return this.http
      .get(this.baseUrl + "/api/getDatabaseList")
      .pipe(catchError(this.handleError));
  }

  downloadFile(id: string): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/octet-stream",
    });
    return this.http
      .get(this.baseUrl + "/chatgpt/downloadFile/" + id, {
        headers: headers,
        observe: "response", // Set the observe option to 'response'
        responseType: "blob" as "json", // Set the responseType option to 'blob'
      })
      .pipe(catchError(this.handleError));
  }

  getToken(): void {
    // this.baseUrl = Config.base_url;
    this.tokenSubject.subscribe((tokenValue: any) => {
      this.token = tokenValue;
      if (this.token == null) {
        this.router.navigateByUrl("auth/login");
      } else {
        if (this.tokenExpired(this.token)) {
          this.router.navigateByUrl("auth/login");
        } else {
        }
      }
      this.headers = new HttpHeaders({
        Authorization: "Bearer " + this.token,
      });
    });
    this.options = { headers: this.headers, observe: "response" };
  }

  get(url: string, isPublic?: boolean) {
    let options = {};

    this.getToken();
    if (isPublic) {
      options = {};
    } else {
      options = this.options;
    }
    const promise = new Promise<any>((resolve, reject) => {
      this.http.get(this.baseUrl + url, this.options).subscribe({
        next: (response: any) => {
          // console.log(response);
          resolve(this.onResponse(response, "response"));
        },
        error: (err: any) => {
          // console.log(err);
          reject(this.onResponse(err, "error"));
        },
      });
    });
    return promise;
  }

  public authGet(url: string): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.http.get(this.baseUrl + url).subscribe({
        next: (response: any) => {
          // console.log(response);
          resolve(this.onResponse(response, "response"));
        },
        error: (err: any) => {
          // console.log(err);
          reject(this.onResponse(err, "error"));
        },
      });
    });
    return promise;
  }

  public delete(url: string): Promise<any> {
    this.getToken();
    return this.http
      .delete(this.baseUrl + url, this.options)
      .toPromise()
      .then(
        (response: any) => {
          return this.onResponse(response, "response");
        },
        (reason: any) => {
          return this.onResponse(reason, "error");
        }
      )
      .catch(this.handleError);
  }

  public post(apiSlug: string, formData: any, hasFile?: boolean) {
    this.getToken();
    let data: any = formData;
    if (hasFile) {
      data = new FormData();
      for (var key in formData) {
        if (formData[key] && formData[key].length > 0 && key != "obj") {
          let dt = formData[key];
          dt.forEach((element: any) => {
            if (element) {
              data.append(key, element);
            }
          });
        } else {
          data.append(key, formData[key]);
        }
      }
    }
    const promise = new Promise<any>((resolve, reject) => {
      this.http.post(this.baseUrl + apiSlug, data, this.options).subscribe({
        next: (response: any) => {
          // console.log(response);
          resolve(this.onResponse(response, "response"));
        },
        error: (err: any) => {
          // console.log(err);
          reject(this.onResponse(err, "error"));
        },
      });
    });
    return promise;
  }

  public authPost(
    apiSlug: string,
    formData: any,
    hasFile?: boolean
  ): Promise<any> {
    let data: any = formData;
    if (hasFile) {
      data = new FormData();
      for (var key in formData) {
        if (formData[key] && formData[key].length > 0 && key != "obj") {
          let dt = formData[key];
          dt.forEach((element: any) => {
            if (element) {
              data.append(key, element);
            }
          });
        } else {
          data.append(key, formData[key]);
        }
      }
    }
    const promise = new Promise<any>((resolve, reject) => {
      this.http.post(this.baseUrl + apiSlug, data).subscribe({
        next: (response: any) => {
          // console.log(response);
          resolve(this.onResponse(response, "response"));
        },
        error: (err: any) => {
          // console.log(err);
          reject(this.onResponse(err, "error"));
        },
      });
    });
    return promise;
  }

  public auth(url: any, formData: any): Promise<any> {
    return this.http
      .post(this.baseUrl + url, formData)
      .toPromise()
      .then(
        (response: any) => {
          if (response?.data?.hasOwnProperty("user")) {
          }
          return response;
        },
        (reason: any) => {
          setTimeout(() => {}, 800);

          if (reason.error.code === 401) {
            localStorage.clear();
            let res = {
              code: reason.error.code,
              status: "ERROR",
              message: "Unauthorized user.",
            };
            return res;
          } else if (reason.error.code === 403) {
            localStorage.clear();

            let res = {
              code: reason.error.code,
              status: "ERROR",
              message: "Unauthorized user , you can not access the route.",
            };
            return res;
          } else if (reason.error.code === 422) {
            let res = {
              code: reason.error.code,
              status: "ERROR",
              message: reason.error.data,
            };
            return res;
          } else if (reason.error.code === 500) {
            let res = {
              code: reason.error.code,
              status: "ERROR",
              message: reason.error.message,
            };
            return res;
          } else {
            return reason;
          }
        }
      )
      .catch(this.handleError);
  }

  /**
   * onResponse
   */
  public onResponse(response: any, type: any) {
    setTimeout(() => {}, 800);

    if (type == "response") {
      if (response.status === 403 || response.statusCode === 403) {
        localStorage.clear();
        window.location.reload();
      } else {
        if (response.data) {
          return response.data;
        } else if (response.body) {
          return response.body;
        } else {
          return response;
        }
      }
    } else {
      if (response.status === 401) {
        localStorage.clear();
        let res = {
          code: response.status,
          status: "Error",
          message: "Your session has been expired",
        };
        return res;
      }
    }
  }

  public handleError(error: any): Promise<any> {
    return error;
  }
}
