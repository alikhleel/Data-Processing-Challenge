import { Database } from "bun:sqlite";
import {
  AccountRequest,
  AddNewActivity,
  InspectionRequest,
  NewLicenseRequest,
  Request,
  StampLicenseLetter,
} from "./models";

export class RequestDatabase {
  private db: Database;
  static instance: RequestDatabase;
  static getInstance() {
    if (!RequestDatabase.instance) {
      RequestDatabase.instance = new RequestDatabase();
    }
    return RequestDatabase.instance;
  }

  private constructor() {
    this.db = new Database("requests.db");
    this.init()
      .then(() => console.log("Database initialized"))
      .catch(console.error);
  }
  async transaction(
    callback: (reqs: Request[]) => any,
    requests: Request[] = []
  ) {
    return await this.db.transaction(callback)(requests);
  }
  addRequest(request: Request) {
    this.db.run(
      "INSERT OR IGNORE INTO request(request_id, request_type, request_status) VALUES(?, ?, ?)",
      [request.RequestID, request.RequestType, request.RequestStatus]
    );
  }

  addNewLicenseRequest(request_id: number, request: NewLicenseRequest) {
    this.db.run(
      "INSERT INTO newLicense(request_id, company_name, licence_type, is_office, office_name, office_service_number, request_date, activities) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        request_id,
        request.CompanyName,
        request.LicenceType,
        request.IsOffice,
        request.OfficeName,
        request.OfficeServiceNumber,
        request.RequestDate,
        request.Activities,
      ]
    );
  }

  addAccountRequest(request_id: number, request: AccountRequest) {
    this.db.run(
      "INSERT INTO accountRequest(request_id, company_name, requester_name, applicant_name, user_name, contact_email, permissions) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [
        request_id,
        request.CompanyName,
        request.RequesterName,
        request.ApplicantName,
        request.UserName,
        request.ContactEmail,
        request.Permissions.toString(),
      ]
    );
  }

  addInspectionRequest(request_id: number, request: InspectionRequest) {
    this.db.run(
      "INSERT INTO inspectionRequest(request_id, company_name, inspection_date, inspection_time, inspection_type) VALUES(?, ?, ?, ?, ?)",
      [
        request_id,
        request.CompanyName,
        request.InspectionDate,
        request.InspectionTime,
        request.InspectionType,
      ]
    );
  }

  addAddNewActivity(request_id: number, request: AddNewActivity) {
    this.db.run(
      "INSERT INTO addNewActivity(request_id, company_name, licence_id, activities) VALUES(?, ?, ?, ?)",
      [
        request_id,
        request.CompanyName,
        request.LicenceID,
        request.Activities.toString(),
      ]
    );
  }

  addStampLicenseLetter(request_id: number, request: StampLicenseLetter) {
    this.db.run(
      "INSERT INTO stampLicenseLetter(request_id, company_name, licence_id, request_date) VALUES(?, ?, ?, ?)",
      [request_id, request.CompanyName, request.LicenceID, request.RequestDate]
    );
  }

  async init() {
    const init_file = Bun.file("./src/database/init.sql");
    const sql = await init_file.text();
    const commands = sql.split(";");
    commands.forEach((command) => {
      if (command.trim().length > 0) this.db.run(command);
    });
  }
}
//     this.db.run(`
//             CREATE TABLE IF NOT EXISTS request(
//                 request_id           INTEGER PRIMARY KEY,
//                 request_type         INTEGER NOT NULL,
//                 request_status       INTEGER NOT NULL
//             );`);
//     this.db.run(`
//             CREATE TABLE IF NOT EXISTS newLicense(
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 request_id           INTEGER NOT NULL,
//                 company_name         Text  NOT NULL,
//                 licence_type         Text  NOT NULL,
//                 is_office            Text NOT NULL,
//                 office_name          Text NOT NULL,
//                 office_service_number Text  NOT NULL,
//                 request_date         DATE  NOT NULL,
//                 activities          Text  NOT NULL,
//                 FOREIGN KEY(request_id) REFERENCES request(request_id)
//             );`);

//     this.db.run(`
//             CREATE TABLE IF NOT EXISTS accountRequest(
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 request_id           INTEGER NOT NULL,
//                 company_name         Text  NOT NULL,
//                 requester_name       Text  NOT NULL,
//                 applicant_name       Text  NOT NULL,
//                 user_name            Text  NOT NULL,
//                 contact_email        Text  NOT NULL,
//                 permissions          Text  NOT NULL,
//                 FOREIGN KEY(request_id) REFERENCES request(request_id)
//             );`);
//     this.db.run(`
//             CREATE TABLE IF NOT EXISTS inspectionRequest(
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 request_id           INTEGER NOT NULL,
//                 company_name         Text  NOT NULL,
//                 inspection_date      DATE NOT NULL,
//                 inspection_time      TIME NOT NULL,
//                 inspection_type      Text  NOT NULL,
//                 FOREIGN KEY(request_id) REFERENCES request(request_id)
//             );`);
//     this.db.run(`
//             CREATE TABLE IF NOT EXISTS addNewActivity(
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 request_id           INTEGER NOT NULL,
//                 company_name         Text  NOT NULL,
//                 licence_id           Text  NOT NULL,
//                 activities           Text  NOT NULL,
//                 FOREIGN KEY(request_id) REFERENCES request(request_id)
//             );`);
//     this.db.run(`
//             CREATE TABLE IF NOT EXISTS stampLicenseLetter(
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 request_id           INTEGER NOT NULL,
//                 company_name         Text  NOT NULL,
//                 licence_id           Text  NOT NULL,
//                 request_date         DATE NOT NULL,
//                 FOREIGN KEY(request_id) REFERENCES request(request_id)
//             );`);
//   }
// }
