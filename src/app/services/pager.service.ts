import * as _ from 'underscore';

export class PagerService {
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);
        console.log(totalPages);
        let startPage: number, endPage: number;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                if ((totalPages - (currentPage - 2)) === 5) {
                   startPage = currentPage - 1;
                  endPage = currentPage + 3;
                } else {
                   startPage = currentPage - 2;
                   endPage = currentPage + 2;
                }
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        console.log(startPage + 'dg' + endPage );
        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        console.log(pages);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
