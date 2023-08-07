import { Component } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|product[];
  constructor(private activeRoute:ActivatedRoute , private product:ProductService){

  }
ngOnInit(){
  let query=this.activeRoute.snapshot.paramMap.get('query')
  query&& this.product.searchProduct(query).subscribe((result)=>{
    this.searchResult=result
  })
}
}
