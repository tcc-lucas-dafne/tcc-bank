import { API } from "./index";

function getRequests() {
  try {
    return API.get("/limit/request")
  } catch (err) {
    console.error("getRequests: ", err);
    throw err;
  }
}

function createRequest(requestedAmount: number) {
  try {
    return API.post("/limit/request", { requestedAmount })
  } catch (err) {
    console.error("createRequest: ", err);
    throw err;
  }
}

function reviewRequest(data: ReviewRequest) {
  try {
    return API.post("/limit/request/review", data)
  } catch (err) {
    console.error("reviewRequest: ", err);
    throw err;
  }
}

const RequestService = {
  getRequests,
  createRequest,
  reviewRequest
}

export default RequestService;