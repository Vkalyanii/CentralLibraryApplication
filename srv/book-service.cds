using  Book.details as db  from '../db/data-model';

@path: '/BookSRV'
service bookService {

 entity Book as projection on db.Book;
  entity User as projection on db.User;
   entity BookLoan as projection on db.BookLoan;
    entity Reservation as projection on db.Reservation; 

}