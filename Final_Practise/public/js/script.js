function get_Joke(){

    var cors_proxy = "https://cors-anywhere.herokuapp.com/";

    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url:
        "https://sv443.net/jokeapi/v2/joke/Programming?type=single",

    }).done(function(response){
        console.log("success");
        console.log(response.joke);


        //save to database
        $.post('/save_joke', {joke: response.joke});
        
        $('#jokes').append('<h2>"'+response.joke+'"</h2>');


    });

    // $.get("https://sv443.net/jokeapi/v2/joke/Programming?type=single", function(data){

    // console.log(data.joke);


    // })


    
}


$(document).ready(function(){

    get_Joke()

    setInterval(async() => {

        get_Joke()
    }, 5 * 60 * 1000)
    
    
    $("#avg_button").click(function(){
        //get user input
        var str = $("#njokes").val();

        //get average 
        $.get('/get_average/'+str, function(data){

           // change the text
            $("#average").text(data.average)
        });
    });
})