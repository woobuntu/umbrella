import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { concatMap, from, Observable, tap, timer } from 'rxjs';
import { promisify } from 'util';

@Injectable()
export class SessionService {
  timerHash: any;

  constructor(private configService: ConfigService) {
    this.timerHash = {};
  }

  async getSession(params: {
    sessionId: string;
    sessionStore: any;
  }): Promise<any> {
    const { sessionId, sessionStore } = params;

    const getSessionPromise = promisify(sessionStore.get.bind(sessionStore));

    return getSessionPromise(sessionId);
  }

  setSession(params: { session: any; sessionStore: any }): Observable<any> {
    const { session, sessionStore } = params;
    const { sessionId } = session;

    const setSessionPromise = promisify(sessionStore.set.bind(sessionStore));

    return from(setSessionPromise(sessionId, session));
  }

  cleanUpTimer(sessionId: string) {
    if (this.timerHash.hasOwnProperty(sessionId)) {
      const subscription = this.timerHash[sessionId];
      const { closed } = subscription;
      if (!closed) {
        subscription.unsubscribe();
      }
      delete this.timerHash[sessionId];
    }
  }

  setExpires(params: { sessionId: string; sessionStore: any }) {
    const { sessionId, sessionStore } = params;

    const sessionDuration = this.configService.get<number>('SESSION_DURATION');

    const destorySessionPromise = promisify(
      sessionStore.destroy.bind(sessionStore),
    );

    const subscription = timer(sessionDuration)
      .pipe(concatMap(() => from(destorySessionPromise(sessionId))))
      .subscribe({
        next: () => {
          console.log(`sessionId ${sessionId} is Destroyed!`, sessionStore);
          this.cleanUpTimer(sessionId);
        },
        error: (error) => {
          console.log('Session Destroy Error : ', error);
          this.cleanUpTimer(sessionId);
        },
      });

    this.timerHash[sessionId] = subscription;

    return subscription;
  }

  destroySession(params: {
    sessionId: string;
    sessionStore: any;
  }): Observable<any> {
    const { sessionId, sessionStore } = params;

    const destorySessionPromise = promisify(
      sessionStore.destroy.bind(sessionStore),
    );

    return from(destorySessionPromise(sessionId)).pipe(
      tap(() => this.cleanUpTimer(sessionId)),
    );
  }
}
