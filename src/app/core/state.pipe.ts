import { Pipe } from "@angular/core";
import { SharedState, MODES } from "./sharedState.model";
import { Model } from "../model/repository.model";

// @Pipe({
//     name: "formatState",
//     pure: true
// })
@Pipe({
    name: 'formatState',
    pure: true
})
export class StatePipe {

    constructor(private model: Model) {
    }

    transform(value: any) {
        if(value instanceof SharedState) {
            let state = value as SharedState;
            return MODES[state.mode] + (state.id != undefined ?
                ` ${this.model.getProduct(state.id).name}` : "");
        } else {
            return "<No Data>"
        }
    }

//    parei na pagina 580;

    // constructor(private model: Model) { }
    //
    // transform(value: any): string {
    //     if (value instanceof SharedState) {
    //         let state = value as SharedState;
    //         return MODES[state.mode] + (state.id != undefined
    //             ? ` ${this.model.getProduct(state.id).name}` : "");
    //     } else {
    //         return "<No Data>"
    //     }
    // }
}
