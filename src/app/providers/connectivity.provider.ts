import { Injectable } from '@angular/core';
import { ConnectionStatus } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { ToastService } from '../services/toast.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConnectivityProvider {
  cont = 0;
  conStatus: boolean;

  private handler: PluginListenerHandle;
  private status = new BehaviorSubject<ConnectionStatus>(null);

  constructor(private toastr: ToastService) {
    this.handler = Network.addListener("networkStatusChange", (status) => {
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