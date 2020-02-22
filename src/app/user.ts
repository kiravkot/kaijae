export class Contest {
  public constructor(
    public path: string,
    public uid: string,
    public contestid: string,
    public contestname: string,
    public date: string,
    public description: string,
    public location: string,
    public status: boolean,
    public data: any,
    public flag: boolean
  ) {}
}

export class Match {
  public constructor(
    public uid: string,
    public id: string,
    public name: string,
    public time: number,
    public type: string
  ) {}
}

export class User {
  public constructor(
    public uid: string,
    public Province: string,
    public address: string,
    public email: string,
    public fname: string,
    public lname: string,
    public password: string,
    public permission: string,
    // public ConfirmPassword: string,
    public sex: string,
    public tel: string
  ) {}
}

export class Player {
  public constructor(
    public uid: string,
    public id: string,
    public number: string,
    public name: string,
    public score: number,
    public committeeid: string,
    public status: boolean,
    public refpath: string,
    public data: any
  ) {}
}
