class RoleView {
  id: String;
  admin: String;
  accounts: Array<String>;

  constructor(id: String, admin: String, accounts: Array<String>) {
    this.id = id;
    this.admin = admin;
    this.accounts = accounts;
  }
}

export {RoleView};
