export interface IVrm { 
    permitVrmId: number;
    vrm: string; 
    isActive: boolean; 
    make: string; 
    model: string; 
    colour: string; 
    inValid: boolean;
}

export class Vrm implements IVrm { 
    permitVrmId: number;
    vrm: string; 
    isActive: boolean; 
    make: string; 
    model: string; 
    colour: string; 
    inValid: boolean

    constructor() {
        this.permitVrmId = 0,
        this.vrm = '',
        this.isActive = true,
        this.make = '',
        this.model = '',
        this.colour = '',
        this.inValid = false
    }
}