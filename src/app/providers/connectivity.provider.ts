import { Injectable } from '@angular/core';
import { ConnectionStatus } from '@capacitor/network';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectivityProvider {
  private status = new BehaviorSubject<ConnectionStatus>(null);

  constructor() {
    Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      this.sendStatusChangeMsg(status);
    });
  }
  
  public getStatus(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  private sendStatusChangeMsg(status: ConnectionStatus): void {
    this.status.next(status);
  }

    
}