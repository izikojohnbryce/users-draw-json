let input = document.getElementById('select-user-count');

let handleChange = (e) => new Promise((resolve, reject) =>{
    window.localStorage.setItem("userCount" , e.target.value); // saving the user input
    
    fetch(`https://randomuser.me/api?results=${e.target.value}`)
    .then((res) =>{return res.json()}).then((res)=>{
        window.localStorage.setItem("users" , JSON.stringify(res)); // saving the user input

        document.getElementById('user-list').innerHTML =res.results.map((value)=>{
            return {
                name:`${value.name.first}, ${value.name.last}`,
                locationText:`${value.location.country}, ${value.location.city}`,
                phone:value.phone,
                country: value.location.country,
                pic:value.picture.large,
                uid:value.login.uuid
            }
        }).map((value)=>{
            return `
            <div id="${value.uid}" class="card user">
                <img src="${value.pic}" class="card-pic">
                <h1>${value.name}</h1>
                <small>${value.locationText}</small>
                <small>${value.phone}</small>
                <button class="lang" type="button" data-country="${value.country}" data-uuid="${value.uid}"  >Language!</button> 
                <div id="languages-grid" class="languages-grid" ></div>
            </div>

            `
        }).join('');
     /// btn we made costum att calling "data -uuid" each time we clik we activate the func and make it unique.
    })

 });

// $('.user button.lang').on('click', ()=>{
let cache = {}
// }) // this will made the page to save (hold) multi events insted of one like here  
$("body").on('click', '.user button.lang', (e) => {
    // let users = JSON.parse(window.localStorage.getItem("users")); // saving the user input
   
    

    let el = $(e.currentTarget);
    // let uuid = el.data('uuid');
    let country = el.data('country');
    let div = el.parent().children('.languages-grid');
    if(div.html() === '' && !cache[country]){
        // No cache and no value.
        fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        // exacly like line 8 but shorter
        .then(res => res.json()).then(
            (res)=>{
                let langHTML = res[0].languages.map(lang => `<span>${lang.name}</span>`).join(', ');
                cache[country] = langHTML;
                div.html(langHTML);
        });
    }else if(div.html() === '' ){
        // Cache exist but no value.
 
        div.html(cache[country]);
    }else{
        // Cache exist and value.
 
        div.html('')
    }

    // let user = users.find(user => user.uid = uuid);

});

input.onchange = handleChange;