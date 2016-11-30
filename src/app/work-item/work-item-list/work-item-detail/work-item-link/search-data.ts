import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { WorkItem } from '../../../work-item';

import { CompleterItem, CompleterData } from 'ng2-completer';

export class SearchData extends Subject<CompleterItem[]> implements CompleterData {
   private searchUrl = process.env.API_URL + 'search?q=';
   constructor(private http: Http) {
      super();
   }
   public search(term: string): void {
       this.http.get(this.searchUrl + term)
            .map((res: Response) => {
                // Convert the result to CompleterItem[]
                let responseData = res.json();
                let workItems = responseData.data;
                let matches: CompleterItem[] = workItems.map((workItem: WorkItem) => {
                    return {
                        title: workItem['fields']['system.title'],
                        id: workItem.id
                    };
                });
                this.next(matches);
           })
           .subscribe();
   }

 public cancel() {
     // Handle cancel
 }
}