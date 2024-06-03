namespace Book.details;

using {reusable.types as types} from './reusableTypes';
using {cuid} from '@sap/cds/common';

// @assert.unique:{
//     email:[email],
//     phone:[phone]
// }

entity Book :cuid{
        ISBN        : String;
        Title       : String;
        Author      : String;
        Genre       : String;
        No_of_books : String;
        Description : String;
        Avl_Quantity:String;
        user        : Association to User;
        bookLoan1   : Association to  BookLoan on bookLoan1.book = $self;
}

@assert.unique:{
    email:[email],
    Phone:[Phone]
}
entity User :cuid {
        username    : String;
        userType    : String;
        password    : String;
        email       : types.Email not null;
        FullName    : String;
        Address     : String;
        Phone       : types.Phone not null;
        book        : Association to many Book on book.user=$self;
        bookLoan    : Association to many BookLoan on bookLoan.user_ID = $self;
         reservation  : Association to many Reservation
                  on reservation.user_ID = $self;
  
}   

entity BookLoan : cuid{
        user_ID     : Association to User;
        issue_Date  : Date;
        due_Date    : Date;
        return_Date : Date;
        
        book        : Association to Book;
        notify      :String;
       
}

entity Reservation {
    key id          : UUID;
        user_ID     :Association to User;
    reservation_date: Date;
        status      : String;
        book        : Association to Book;
}

