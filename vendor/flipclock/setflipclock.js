$(function(){
    countDown = function(){
        var currentDate = Math.round(new Date() / 1000);

        var clock = $('.clock').FlipClock({
            countdown: true,
            callbacks: {
                init: function() {
                    //store end date If it's not yet in cookies
                    if(!$.cookie('endDate')){
                        // end date = current date + 1 minutes
                        var endDate = Date.now() + 15*60*1000; 

                        // store end date in cookies
                        $.cookie('endDate', Math.round(endDate / 1000)); 
                    }
                },
                interval: function () {
                    var currentDate = Math.round(new Date() / 1000);
                    var time = clock.getTime().time;
                },
                stop: function() {
                    $('.message').html('The clock has stopped!');
                },
            }
        });

        // counter will be in first 1 min if the user refresh the page the counter will be the difference between current and end Date, so like this counter can continue the countdown normally in case of refresh.
        var counter = $.cookie('endDate')-currentDate;

        clock.setTime(counter);
        clock.setCountdown(true);

        clock.start();
    }

    //reset button
    $('#reset').click(function(){
        $.removeCookie('endDate'); //removing end date from cookies
        countDown(); //launch countdown function
    });
    
    //Lanching countDown function on ready
    countDown();
});