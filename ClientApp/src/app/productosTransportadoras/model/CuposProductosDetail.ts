import { Theme } from './theme';
import { Profile } from './profile';

export class CuposProductosDetail {
    nombreProducto: string;
    prioridad: string;
    horaTope: string;
    cupoBase: number;
    cantCupos: number;
    porcDeshabilita: number;
    cupoMinimo: number;
    activo: boolean;
    dom2: boolean;
    checkExcepcion: boolean;
    // excepcion
    nombreExcepcion: string;
    fechaIni: string;
    fechaFin: string;
    horaTopeExcepcion: string;
    cuposTotalesExcepcion: number;
    porDeshabilitaExcepcion: number;
    cuposMinimosExcepcion: number;
    checkActivoExcepcion: boolean;
    // transportadora
    nombreTransportadora: string;
    horasPrevias: string;
    checkActivoTransportadora: boolean;
    horasTransportadora: string;
    diasPromesa: number;
}
