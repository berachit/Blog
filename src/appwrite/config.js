import { Client, Databases, Storage, Id, Query, ID } from "appwrite";
import { conf } from "../conf/conf";

export class Services {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appWriteUrl).setProject(conf.projectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return this.databases.getDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts() {
    // async getPosts(query = [Query.equal("status" , "active")]){         ~~~(alt)
    try {
      return this.databases.listDocuments(
        conf.databaseId,
        conf.collectionId,
        // query                 ~~~(alt)
        [Query.equal("status", "active")]        // status index we have written
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   file (image) upload service

  async uploadFiles(file) {
    try {
      return this.bucket.createFile(
        conf.bucketId, 
        ID.unique(), 
        file
        );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFiles(fileId){
    try {
        this.bucket.deleteFile(
            conf.bucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log(error);
        return false
    }
  }

  getFilePreview(fileId){  // asyn-await not used because no need here!
    try {
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
    } catch (error) {
        console.log(error);
    }
  }

}

const service = new Services();

export default service;
