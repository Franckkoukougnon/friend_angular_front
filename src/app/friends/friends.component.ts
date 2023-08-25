import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 


export class Friend {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public departement: string,
    public email: string,
    public country: string,

  ) { }
}
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: Friend[] | undefined ;
  closeResult: string | undefined;
 

  ngOnInit(): void {
    this.getFriends();
    
  }
  constructor(private httpClient :HttpClient,
    private modalService : NgbModal) { }

  getFriends() {
    this.httpClient.get<any>('http://localhost:8082/friend').subscribe(
      response => {
        console.log(response);
        this.friends = response;
      }
    );
  }



  open(content: any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    });
  }
  private getDismissReason(reason: any): string {
    if(reason === ModalDismissReasons.ESC){
      return 'by pressing ESC';
    }else if (reason === ModalDismissReasons.BACKDROP_CLICK){
      return 'by clicking on a backdrop';
    }else {
      return `with: ${reason}`;
    }
  }



}
