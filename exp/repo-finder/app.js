const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
const ulContainer = document.createElement("ul");

const client_id = "Iv1.408ff34dec255f95";
const client_secret = "92b3954c8f4a7b5b654b4f46bee1928afe88b890";


const fetchUsers = async (user)  => {
const api_call =await fetch(`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`);

const data = await api_call.json();
return {data}

};

const showData = () => {
    fetchUsers(inputValue.value).then((res) => {
        console.log(res);

        res.data.forEach(element => {
           addRepo(element.full_name) 
        });
        nameContainer.appendChild(ulContainer)
    })
}

searchButton.addEventListener("click", () => {
    showData();
})

const addRepo = (repoName) => {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(repoName));
    ulContainer.appendChild(li);
}