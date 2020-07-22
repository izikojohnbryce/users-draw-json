let input = document.getElementById('select-user-count');

let handleChange = (e) => new Promise((resolve, reject) =>{
    window.localStorage.setItem("userCount" , e.target.value); // saving the user input