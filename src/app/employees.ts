export class Employee {
    id: string;
    name: string;
    html_url: string;
    description: string;
}

export class Employeedata {
    id: number;
    constructor(
        public avatar: string,
        public chkformtext: boolean,
        public chksubscribe: boolean,
        public createdAt: Date,
        public emailid: string,
        public fName: string,
        public gender: string,
        public lName: string,
        public location: string,
        public password: string
    ) { 
        this.fName = fName;
        this.lName = lName;
    }

    getName(){
        console.log(this.fName + ' ' + this.lName);
        return this.fName + ' ' + this.lName;
    }

}

export class CountryList{
    name: string;
    alpha2Code: string;
    flags: {
      svg: string;
      png: string;
    }
}

export class User {
    id: number;
    /*fName: string;
    emailId: string;
    location: string;
    password: string;
    gender: string;
    formDataCheck: boolean;
    subscribeCheck: boolean;*/
    constructor(
        public fName: string,
        public lName: string,
        public emailId: string,
        public usrCountry: string,
        public gender: string,
        public passwordA: string,
        public chkFormTxt: boolean,
        public chkSubTxt: boolean
    ) { }
}