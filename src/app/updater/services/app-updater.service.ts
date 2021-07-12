import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class AppUpdaterService {
  constructor(
    private readonly updates: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    this.updates.available.subscribe((event) => {
      this.showAppUpdateAlert();
    });
  }

  private showAppUpdateAlert() {
    const snackabar = this.snackBar.open(
      'Jest dostępna nowa wersja aplikacji!',
      'Zaktualizuj',
      {
        duration: 30000,
      }
    );

    snackabar.onAction().subscribe(() => this.doAppUpdate());
  }

  private doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
