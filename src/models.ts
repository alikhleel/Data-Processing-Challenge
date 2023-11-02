export class Request {
  RequestID: number;
  RequestType: number;
  RequestStatus: number;
  RequestData: string;
  constructor(id: number, type: number, status: number, data: string) {
    this.RequestID = id;
    this.RequestType = type;
    this.RequestStatus = status;
    this.RequestData = data;
  }
}
export class NewLicenseRequest {
  CompanyName: string;
  LicenceType: string;
  IsOffice: string;
  OfficeName: string;
  OfficeServiceNumber: string;
  RequestDate: string;
  Activities: string;

  constructor(
    companyName: string,
    licenceType: string,
    isOffice: string,
    officeName: string,
    officeServiceNumber: string,
    requestDate: string,
    activities: string
  ) {
    this.CompanyName = companyName;
    this.LicenceType = licenceType;
    this.IsOffice = isOffice;
    this.OfficeName = officeName;
    this.OfficeServiceNumber = officeServiceNumber;
    this.RequestDate = requestDate;
    this.Activities = activities;
  }
}

export class AccountRequest {
  CompanyName: string;
  RequesterName: string;
  ApplicantName: string;
  UserName: string;
  ContactEmail: string;
  Permissions: string[];

  constructor(
    companyName: string,
    requesterName: string,
    applicantName: string,
    userName: string,
    contactEmail: string,
    permissions: string[]
  ) {
    this.CompanyName = companyName;
    this.RequesterName = requesterName;
    this.ApplicantName = applicantName;
    this.UserName = userName;
    this.ContactEmail = contactEmail;
    this.Permissions = permissions;
  }
}

export class InspectionRequest {
  CompanyName: string;
  InspectionDate: string;
  InspectionTime: string;
  InspectionType: string;

  constructor(
    companyName: string,
    inspectionDate: string,
    inspectionTime: string,
    inspectionType: string
  ) {
    this.CompanyName = companyName;
    this.InspectionDate = inspectionDate;
    this.InspectionTime = inspectionTime;
    this.InspectionType = inspectionType;
  }
}

export class AddNewActivity {
  CompanyName: string;
  LicenceID: string;
  Activities: string[];

  constructor(companyName: string, licenceID: string, activities: string[]) {
    this.CompanyName = companyName;
    this.LicenceID = licenceID;
    this.Activities = activities;
  }
}

export class StampLicenseLetter {
  CompanyName: string;
  LicenceID: string;
  RequestDate: string;

  constructor(companyName: string, licenceID: string, requestDate: string) {
    this.CompanyName = companyName;
    this.LicenceID = licenceID;
    this.RequestDate = requestDate;
  }
}
