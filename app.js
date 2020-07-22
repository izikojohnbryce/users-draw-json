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

            }})
}
