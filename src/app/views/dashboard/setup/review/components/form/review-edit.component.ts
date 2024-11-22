import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {abcForms} from '../../../../../../../environments/generals';
import {Review} from '../../models/review';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-review-edit',
    standalone: true,
    imports: [FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule, MatFormFieldModule, MatInputModule],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <!-- Header -->
            <div class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary">
                <div class="text-lg font-medium" [innerHTML]="title"></div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>

            <!-- Compose form -->
            <form class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto" [formGroup]="reviewForm">
                <mat-form-field>
                    <mat-label>Puntuacion</mat-label>
                    <input matInput formControlName="rating" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Reseña</mat-label>
                    <input matInput formControlName="review" />
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Fecha de Envio</mat-label>
                    <input matInput formControlName="send_date" type="date"/>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Fecha de Actualizar</mat-label>
                    <input matInput formControlName="update_date" type="date" />
                </mat-form-field>
                <!-- Actions -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6">
                    <div class="flex space-x-2 items-center mt-4 sm:mt-0 ml-auto">
                        <button mat-stroked-button [color]="'warn'" (click)="cancelForm()">Cancelar</button>
                        <button mat-stroked-button [color]="'primary'" (click)="saveForm()">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `
})
export class ReviewEditComponent implements OnInit {
    reviewForm = new FormGroup({
        rating: new FormControl('', [Validators.required]),
        review: new FormControl('', [Validators.required]),
        send_date: new FormControl<Date | null>(null, [Validators.required]), // Soporte para fechas
        update_date: new FormControl<Date | null>(null, [Validators.required])
    });
    @Input() title: string = '';
    @Input() review = new Review();
    abcForms: any;

    constructor(
        private formBuilder: FormBuilder,
        private _matDialog: MatDialogRef<ReviewEditComponent>,
    ) {
    }

    ngOnInit() {
        this.abcForms = abcForms;

        if (this.review) {
            console.log(this.review);

            // Transformar los valores para que coincidan con el formulario
            const transformedReview = {
                rating: this.review.rating.toString(), // Convertir number a string
                review: this.review.review,
                send_date: this.review.send_date ? new Date(this.review.send_date) : null, // Asegurarse de que sea tipo Date
                update_date: this.review.update_date ? new Date(this.review.update_date) : null
            };

            this.reviewForm.patchValue(transformedReview);
        }
    }

    public saveForm(): void {
        if (this.reviewForm.valid) {
            this._matDialog.close(this.reviewForm.value);
        }
    }

    public cancelForm(): void {
        this._matDialog.close('');
    }
}
