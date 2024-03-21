import { Department } from "./department";
import { Project } from "./project";

export class User {
     userId!: number;
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
     birthDate: Date | undefined;
     joinDate: string | undefined;

}
