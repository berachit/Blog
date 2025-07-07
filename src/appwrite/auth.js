import { conf } from "../conf/conf";
import { Client, ID, Account } from "appwrite";

// class -> A template for objects
// constructor() -> A special method that runs automatically when you create a new object from the class
// this -> Refers to the current object
// new -> Used to create an object from class


export class AuthService {
    client = new Client();  // Creates a base Appwrite connection
    account;  // Prepare a variable to hold Account object

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl) // Set Appwrite API endpoint
            .setProject(conf.projectId);  // Set your Appwrite project

        this.account = new Account(this.client); // Now your account can call Appwrite auth functions
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Account creation failed:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Login failed:", error);
            throw error;
        }
    }

    async currentAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Fetching current account failed:", error);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout failed:", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
