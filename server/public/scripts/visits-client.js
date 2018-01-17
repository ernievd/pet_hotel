$(document).ready(onReady);

function onReady() {
    getVisits();
}


function getVisits() {
    $.ajax({
        method: 'GET',
        url: '/visits',
        success: function (response) {
            displayPetVisits(response);
            console.log('visits', response);
        }
    })
}

function displayPetVisits(pets) {
    $('.pet-list').empty();
    for (let i = 0; i < pets.length; i++) {
        let pet = pets[i]
        let $row = $(`<tr>`);
        $row.append(`
        <td class="petName">${pet.name}</td>
        <td class="check-out-date">${splitDate(pet.check_in_date)}</td>
        <td class="check-in-date">${splitDate(pet.check_out_date)}</td>
        `);
        $('.pet-list').append($row);
        $row.data(pet);
    } //end for loop
    // Need to also get all owner names to help populate the owner dropdown
} //end displayPets

function splitDate(date) {
    date = date.split('T')[0];
    return date;
}