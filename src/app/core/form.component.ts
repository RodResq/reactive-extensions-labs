import { Component, DoCheck, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent implements DoCheck {
    product: Product = new Product();
    lastId: number;

    constructor(
        private model: Model,
        @Inject(SHARED_STATE) private state: SharedState) {}

    get editing(): boolean {
        return this.state.mode == MODES.EDIT;
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

    ngDoCheck(): void {
        if(this.lastId != this.state.id) {
            this.product = new Product();
            if(this.state.mode == MODES.EDIT) {
                Object.assign(this.product, this.model.getProduct(this.state.id));
            }
            this.lastId = this.state.id;
        }
        
    }
}