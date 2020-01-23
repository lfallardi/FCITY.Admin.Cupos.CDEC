export class cuposProductosFilter {
    nombreProducto: string;
    idPrioridadIngresa: string;
    activo: boolean;
    esDomicilio2: boolean;
    horaTope: string;

    constructor()

    constructor(nombreProducto?: string, idPrioridadIngresa?: string,
                activo?: boolean, esDomicilio2?: boolean,
                horaTope?: string) {
                    this.nombreProducto = nombreProducto === undefined ? '' : nombreProducto;
                    this.idPrioridadIngresa = idPrioridadIngresa === undefined ? '' : idPrioridadIngresa;
                    this.activo = activo === undefined ? null : activo;
                    this.esDomicilio2 = esDomicilio2 === undefined ? null : esDomicilio2;
                    this.horaTope = horaTope === undefined ? '' : horaTope;
                }

}
