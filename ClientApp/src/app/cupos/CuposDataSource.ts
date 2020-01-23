import { DataSource, CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Cupos } from 'src/model/cupos';
import { CuposBaseService } from 'src/services/cuposBase.service';
import { GenService } from 'src/services/servicesGen.service';

export class CuposDataSource extends DataSource<Cupos> {

    private cuposSubject = new BehaviorSubject<Cupos[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    private lengthBehaviorSubject = new BehaviorSubject<number>(0);
    public currentLength = this.lengthBehaviorSubject.asObservable();

    public loading$ = this.loadingSubject.asObservable();

    // constructor(private genAPI: GenService, private sort: MatSort) {
    //   super();
    // }
    constructor(private cuposService: CuposBaseService, private sort: MatSort) {
        super();
    }

    public getData(): Cupos[] {
        return this.cuposSubject.getValue();
    }

    connect(collectionViewer: CollectionViewer): Observable<Cupos[]> {
        const dataMutations = [
        this.cuposSubject.asObservable(),
        this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => { return this.getSortedData(this.cuposSubject.getValue()); }));
  }

  disconnect() {
    this.cuposSubject.complete();
    this.loadingSubject.complete();
  }

  loadCupos() {
    this.loadingSubject.next(true);

    // this.genAPI.getAPI('CuposBase').pipe(
    //     catchError(() => of([])),
    //     finalize(() => this.loadingSubject.next(false))
    // ).subscribe(cupos => { this.cuposSubject.next(cupos);
    //                        console.log(cupos);
    //                      },
    //             error => { console.log(error, error.message); },
    //             () => { console.log('COMPLETED'); });
    this.cuposService.getCuposBase().pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    ).subscribe(cupos => { this.cuposSubject.next(cupos);
                           console.log(cupos);
                         },
                error => { console.log(error, error.message); },
                () => { console.log('COMPLETED'); });

  }

  clearGrid() {
    this.cuposSubject.next(new Array<Cupos>());
  }

  private getSortedData(data: Cupos[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'idECCupoBase': return compare( a.idECCupoBase,  b.idECCupoBase, isAsc, 'number');
        case 'dia': return compare( a.dia,  b.dia, isAsc, 'string');
        case 'cuposTotales': return compare( a.cuposTotales,  b.cuposTotales, isAsc, 'number');
        case 'porcCuposDesactiva': return compare( a.porcCuposDesactiva,  b.porcCuposDesactiva, isAsc, 'number');
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc, type) {
  if (type == 'string') {
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  } else if (type == 'number') {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
