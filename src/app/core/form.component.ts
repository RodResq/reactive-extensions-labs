import {Observable} from 'rxjs';
import {Component, Inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Product} from '../model/product.model';
import {Model} from '../model/repository.model';
import {MODES, SHARED_STATE, SharedState} from './sharedState.model';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: "paForm",
    templateUrl: 'form.component.html',
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();
    editing: boolean = false;

    constructor(
        private model: Model,
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
            stateEvents
                .pipe(
                    map(state => new SharedState(state.mode, state.id == 5 ? 1: state.id)),
                    filter(state => state.id != 3))
                .subscribe((update) => {
                    this.product = new Product();
                    if(update.id != undefined) {
                        Object.assign(this.product, this.model.getProduct(update.id));
                    }
                    this.editing = update.mode == MODES.EDIT;
            });
        }

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.product = new Product();
            form.reset();
        }
    }

    resetForm() {
        this.product = new Product();
    }

    // Pagina 594
}
