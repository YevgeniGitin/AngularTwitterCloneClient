import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { Observable, Subscription, timer, BehaviorSubject } from 'rxjs';
import { Post, Star } from '../models/post';
//request url prefix
const url = 'http://localhost:3001/api/tweets';

@Injectable()
export class PostService implements OnDestroy {
  private tweetsBehaviorSubject = new BehaviorSubject<Post[]>(null);
  readonly tweets = this.tweetsBehaviorSubject.asObservable();
  private tweetArr: Post[];
  private _tweets: Observable<Post[]>;
  initSub: Subscription;
  deleteSub: Subscription;
  postSub: Subscription;
  starSub: Subscription;

  //get all the tweets every 10 sec
  constructor(private http: HttpClient) {
    this._tweets = timer(0, 10000).pipe(
      switchMap(() => this.loadInitialData())
    );
    this.initSub = this._tweets.subscribe(t => (this.tweetArr = t));
  }
  //load all tweeys from the server
  private loadInitialData(): Observable<Post[]> {
    return this.http.get(url).pipe(
      map(json => json as Post[]),
      map(posts => posts.reverse()),
      tap(posts => this.tweetsBehaviorSubject.next(posts)),
      catchError(this.handleError)
    );
  }
  //error function
  private handleError(error: Response) {
    console.error(error);
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
  //return selected user's posts
  getUsersPosts(id: string): Observable<Post[]> {
    return this.tweets.pipe(
      map(t => {
        return t ? t.filter(tweet => tweet.userId === id) : [];
      })
    );
  }
  //send the posts id to server's delete route
  deletePost(id: string) {
    //if we already subscribe we want to unsubscribe before
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
    //delete the tweet from the data base
    this.deleteSub = this.http
      .delete(`${url}/${id}`)
      .pipe(catchError(this.handleError))
      .subscribe();
    //delete the tweet from local in the client for not make http untill the server ubdate
    let index = this.tweetArr.findIndex(tweet => tweet._id === id);
    this.tweetArr.splice(index, 1);
    this.tweetsBehaviorSubject.next(this.tweetArr);
  }
  //add new post to data base by sending the text to the server
  addPost(newPost: string) {
    //if we already subscribe we want to unsubscribe before
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    //write new post to data base
    this.postSub = this.http
      .post(url, { text: newPost })
      .pipe(
        map(json => json as Post),
        catchError(this.handleError)
      )
      .subscribe(post => {
        //write new post local in the client untill the server ubdate
        this.tweetArr.splice(0, 0, post);
        this.tweetsBehaviorSubject.next(this.tweetArr);
      });
  }
  //update post's stsrs dy sending  post's id to the server
  changeStars(id: string) {
    //if we already subscribe we want to unsubscribe before
    if (this.starSub) {
      this.starSub.unsubscribe();
    }
    //update post in data base
    this.http
      .post(`${url}/${id}/star-toggle`, null)
      .pipe(
        map(json => json as Star),
        catchError(this.handleError)
      )
      .subscribe(star => {
        //update the tweet in local observable object
        let index = this.tweetArr.findIndex(tweet => tweet._id === id);
        this.tweetArr[index].stars = star.stars;
        this.tweetArr[index].starredByMe = star.starredByMe;
        this.tweetsBehaviorSubject.next(this.tweetArr);
      });
  }
  //destroy all the subscriptions
  ngOnDestroy() {
    this.initSub.unsubscribe();
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.starSub) {
      this.starSub.unsubscribe();
    }
  }
}
