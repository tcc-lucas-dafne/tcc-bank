import { API } from "./index";

function login(data: Login) {
  try {
    return API.post("/account/login", data)
  } catch (err) {
    console.error("login: ", err);
    throw err;
  }
};

function getUser() {
  try {
    return API.get("/account")
  } catch (err) {
    console.error("getUser: ", err);
    throw err;
  }
};

function createUser(data: Register) {
  try {
    return API.post("/account/register", data)
  } catch (err) {
    console.error("createUser: ", err);
    throw err;
  }
}

function updateUser() {
  // TODO: user update
}

function uploadDocument(formData: any) {
  try {
    return API.post("/upload-document", formData)
  } catch (err) {
    console.error("uploadDocument: ", err);
    throw err;
  }
}

const UserService = {
  login,
  getUser,
  createUser,
  uploadDocument
}

export default UserService;