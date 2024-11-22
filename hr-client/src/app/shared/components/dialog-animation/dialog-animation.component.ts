import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DialogAnimationComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAnimationComponent>);
  onNoClick(): void {
    this.dialogRef.close();
  }
}
