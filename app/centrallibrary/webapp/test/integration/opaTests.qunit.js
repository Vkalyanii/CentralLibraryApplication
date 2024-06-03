sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/app/centrallibrary/test/integration/FirstJourney',
		'com/app/centrallibrary/test/integration/pages/BookList',
		'com/app/centrallibrary/test/integration/pages/BookObjectPage'
    ],
    function(JourneyRunner, opaJourney, BookList, BookObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/app/centrallibrary') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBookList: BookList,
					onTheBookObjectPage: BookObjectPage
                }
            },
            opaJourney.run
        );
    }
);