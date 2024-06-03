using bookService as service from '../../srv/book-service';
annotate service.Book with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ISBN',
                Value : ISBN,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Title',
                Value : Title,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Author',
                Value : Author,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Genre',
                Value : Genre,
            },
            {
                $Type : 'UI.DataField',
                Label : 'No_of_books',
                Value : No_of_books,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : Description,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ISBN',
            Value : ISBN,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Title',
            Value : Title,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Author',
            Value : Author,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Genre',
            Value : Genre,
        },
        {
            $Type : 'UI.DataField',
            Label : 'No_of_books',
            Value : No_of_books,
        },
    ],
);

annotate service.Book with {
    user @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'User',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : user_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'username',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'userType',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'password',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'email',
            },
        ],
    }
};

