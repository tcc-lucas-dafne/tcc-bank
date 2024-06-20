type Login = {
  email: string;
  password: string;
}

type Register = {
  name: string;
  email: string;
  password: string;
}

type AccountDetail = {
  balance: string;
  acc_limit: string;
}

type Account = {
  name: string;
  email: string;
  image?: string;
}

type UploadUserImage = {
  url: string;
}

type User = Account & AccountDetail

type CreateComment = {
  investmentId: number;
  comment: string;
}

type InvestmentData = {
  investment_id: number;
  name: string;
  description: string;
}

type InvestmentComment = {
  account_id: number;
  comment: string;
  created_at: string;
}
