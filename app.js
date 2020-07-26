let input = document.getElementById('select-user-count');

let handleChange = (e) => new Promise((resolve, reject) =>{
    window.localStorage.setItem("userCount" , e.target.value); // saving the user input
    
    fetch(`https://randomuser.me/api?results=${e.target.value}`)
    .then((res) =>{return res.json()}).then((res)=>{
    
        document.getElementById('user-list').innerHTML =res.results.map((value)=>{
            return {
                name:`${value.name.first}, ${value.name.last}`,
                location:`${value.location.country}, ${value.location.city}`,
                phone:value.phone,
                pic:value.picture.large

            }
        }).map((value)=>{
            return `
            <div class="card">
                <img src="${value.pic}" class="card-pic">
                <h1>${value.name}</h1>
                <small>${value.location}</small>
                <small>${value.phone}</small>
                <button type="button">Language!</button>
                <div id="languages-grid" class="languages-grid" ></div>
            </div>

            `
        }).join('');
    
    })

 });


input.onchange = handleChange;