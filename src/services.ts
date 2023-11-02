import { Request } from "./models";
import { RequestDatabase } from "./db";
import { create_response_data_Processing } from "./utils/responses";
import { REQUEST_TYPES } from "./constants";
import { request } from "http";

export async function dataProcessingService(file: File, db: RequestDatabase) {
  const content = await file.text();
  const lines = content.split("\n").slice(1);
  const requests = lines.map((line) => {
    const [id, type, status] = line.split(",", 3);
    const d = line.match(RegExp("{.*}"))![0].replaceAll(`""`, `"`);
    return {
      RequestID: parseInt(id),
      RequestType: parseInt(type),
      RequestStatus: parseInt(status),
      RequestData: d,
    } as Request;
  });

  return await db
    .transaction(insertRequests, requests)
    .then(create_response_data_Processing)
    .catch((e: Error) => {
      console.log(e);
      return {
        error: e.message,
        message: "Inserting canceled due to an error in one of the records",
      };
    });
}

function insertRequests(requests: Request[], db: RequestDatabase) {
  var currentRequest: Request;
  const counters = Array(REQUEST_TYPES.length).fill(0);
  try {
    requests.forEach((request) => {
      currentRequest = request;
      db.addRequest(request);
      const data = JSON.parse(request.RequestData);
      if (request.RequestType === 1) {
        db.addNewLicenseRequest(request.RequestID, data);
        counters[0]++;
      }
      if (request.RequestType === 2) {
        db.addAccountRequest(request.RequestID, data);
        counters[1]++;
      }
      if (request.RequestType === 3) {
        db.addInspectionRequest(request.RequestID, data);
        counters[2]++;
      }

      if (request.RequestType === 4) {
        db.addAddNewActivity(request.RequestID, data);
        counters[3]++;
      }

      if (request.RequestType === 5) {
        db.addStampLicenseLetter(request.RequestID, data);
        counters[4]++;
      }
    });
  } catch (e) {
    throw new Error(
      `Error in inserting request: ${currentRequest!.RequestID} ${
        currentRequest!.RequestData
      }`
    );
  }
  return counters;
}
