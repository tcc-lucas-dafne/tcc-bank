import { API } from "./index";

function getInvestments() {
  try {
    return API.get("/investment")
  } catch (err) {
    console.error("getInvestments: ", err);
    throw err;
  }
};

function getInvestmentComments(investmentId: number) {
  try {
    return API.get(`/investment/comment?investmentId=${investmentId}`)
  } catch (err) {
    console.error("getInvestmentComments: ", err);
    throw err;
  }
};

function createComment(data: CreateComment) {
  try {
    return API.post("/investment/comment", data)
  } catch (err) {
    console.error("createComment: ", err);
    throw err;
  }
};

const InvestmentService = {
  createComment,
  getInvestments,
  getInvestmentComments
}

export default InvestmentService;