import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { InternalUser } from '../model/internalUser';




// TODO: Replace this with your own data model type
// TODO: Replace this with your own data model type
export interface UserGridItem {
  key: string;
  firstName: string;
}

/**
 * Data source for the UserGrid view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InternalUserGridDataSource extends DataSource<InternalUser> {
  data: InternalUser[] = [];
  paginator: MatPaginator;
  sort: MatSort;


  constructor() {
    super();
   }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InternalUser[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InternalUser[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  public getData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return this.data.slice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InternalUser[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Nombre': return compare(a.firstName, b.firstName , isAsc, 'string');
        case 'Apellido': return compare( a.lastName,  b.lastName, isAsc, 'string');
        case 'Email': return compare(a.email, b.email , isAsc, 'string');
        case 'Rol': return compare( a.role.description,  b.role.description, isAsc, 'string');
        case 'Fecha de creación': return compare( a.role.description,  b.role.description, isAsc, 'string');
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc, type) {
  if (type === 'string') {
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  } else if (type === 'date') {
    return (new Date(a) < new Date(b) ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
