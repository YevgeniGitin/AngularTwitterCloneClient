import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { Post } from "../models/post";

const url = "../assets/data/tweets.json";

@Injectable()

export class PostService {
  private tweetsArray: Post[];
  tweetsPromise: Promise<Post[]>;
  private tweetBehaviorSubject = new BehaviorSubject<Post[]>(null);
  readonly tweets = this.tweetBehaviorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.tweetsPromise = this.loadInitialData(url);
    this.tweetsPromise.then((posts)=>{
      this.tweetsArray=posts;
      this.tweetBehaviorSubject.next(this.tweetsArray);
    });
  }

  private loadInitialData(url: string): Promise<Post[]> {
    return this.http
      .get(url)
      .pipe(map(json => json as Post[]))
      .toPromise()
      .catch(this.handleError);
  }
  createId(): string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    let id: string = Math.random()
      .toString(36)
      .substr(2, 22);
    while (this.getPostById(id) !== undefined) {
      id = Math.random()
        .toString(36)
        .substr(2, 22);
    }
    return id;
  }

  private handleError(error: Response) {
    console.error(error);
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Promise.reject(msg || error);
  }

  getUsersPosts(userName):Observable<Post[]>{
    return this.tweets.pipe(map((t)=>{
     return t? t.filter(tweet=>tweet.userName===userName) : [] 
    }));

  }

  getPostById(id:string):Post{
    return this.tweetsArray.find(t=>t.id===id);
  }

  deletePost(id:string){
    let postIndex:number=this.tweetsArray.findIndex(t=>t.id===id);
    this.tweetsArray.splice(postIndex,1);
    this.tweetBehaviorSubject.next(this.tweetsArray);
  }

  addPost(newPost:Post){
    this.tweetsArray.splice(0,0,newPost);
    this.tweetBehaviorSubject.next(this.tweetsArray);
  }

  changeStars(id:string,userName:string){
    let postIndex=this.tweetsArray.findIndex(post=>post.id===id);
    if(this.tweetsArray[postIndex].stars.find(name=>name===userName)){
      let userIndex=this.tweetsArray[postIndex].stars.findIndex(name=>name===userName);
      this.tweetsArray[postIndex].stars.splice(userIndex,1);
      this.tweetBehaviorSubject.next(this.tweetsArray);
    }else{
      this.tweetsArray[postIndex].stars.push(userName);
      this.tweetBehaviorSubject.next(this.tweetsArray);
    }
  }
}
