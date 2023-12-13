function opslaan(value, event) {
    let liElement = event.target.parentNode.querySelectorAll('.list-group-item')[1];
    let naam = liElement.innerText;
    localStorage.setItem(naam, value);
    console.log(localStorage);
}

function add(button, id) {
    let parent = button.parentElement.parentElement;
    // let naam = parent.querySelectorAll(".list-group-item")[1].innerText;
    let afzet = parent.querySelector("input");
    if (afzet.value < 1) {
        alert('wrong afzet');
    } else {
        fetch(`/add/${id}/${afzet.value}`)
            .then(() => {
                let scrol = window.scrollY
                location.reload()
                window.scrollTo(0, scrol)
            })
    }
}

function checkbal() {
    fetch('checkbal')
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            if (response) {
                winkelwagen.style.visibility = 'visible';
            } else {
                winkelwagen.style.visibility = 'hidden';
            }
        })
}
checkbal()