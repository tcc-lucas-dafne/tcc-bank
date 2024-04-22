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
}

type User = Account & AccountDetail