Handlebars.registerHelper('format-number', function(number)
{
    return number.toLocaleString('latn');
});

const postsTemplate = Handlebars.compile(
    document.getElementById('posts-template').innerHTML
);

$('#search-form').submit(async function(event) 
{   
    event.preventDefault();
    $('#results').html('<div class = "loader"> Loading... </div>');

    let searchInput = document.querySelector("#search").value.trim();

    try {
        let posts = await $.ajax({
            type: 'GET',
            url: 'https://www.reddit.com/r/' + searchInput + '.json'
        });

            let sanitizedHtml = postsTemplate({ posts });
            $('#results').html(sanitizedHtml);
    }

    catch (error)
    {
        console.error(error);

        $('#results').html('Oops, something went wrong...');
    }
});