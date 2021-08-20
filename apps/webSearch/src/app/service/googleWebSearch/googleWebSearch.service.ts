import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CONSTANT_URLS} from "../../constant/web-search-api";
import {Observable} from "rxjs";
import {BaseService} from "../base.service";
import {WebSearchModel} from "../../model/webSearch/webSearch.model";

@Injectable({
  providedIn: 'root'
})
export class GoogleWebSearchService extends BaseService<WebSearchModel>{

  constructor(http: HttpClient) {
    super(http, CONSTANT_URLS.GOOGLESEARCH);
  }

  public getSearch(queryParams?): Observable<WebSearchModel> {
    const params = this.getParamsString(queryParams);

    return this.http.get<WebSearchModel>(`${this.BASE_URL}?${params}`);
  }
}
