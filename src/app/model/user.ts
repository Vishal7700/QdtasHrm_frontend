import { Department } from "./department";
import { Project } from "./project";

export class User {
     userId: number | undefined;
     userName: string | undefined;
     email: string | undefined;
     password: string | undefined;
     firstName: string | undefined;
     middleName: string | undefined;
     lastName: string | undefined;
     gender: string | undefined;
     dept: Department | undefined;
     role: string | undefined;
     phoneNumber: string | undefined;
     address: string | undefined;
     designation: string | undefined;
     emailVerified: Boolean | undefined;
     projects: Project[] = [];
     birthDate: string | undefined;
     joinDate: string | undefined;

}
