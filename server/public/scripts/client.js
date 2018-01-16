$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Get pets on load
    getPets();
  
    // Event Listeners
    $('table').on('click', '.deleteButton', deletePets);

} // End readySetGo function


function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: displayPets
    }); //end ajax get
} // End getPets

function displayPets(pets) {
    $('.pet-list').empty();    
    for (let i = 0; i < pets.length; i++) {
        let pet = pets[i]
        let $row = $(`<tr data-id="${pet.id}">`);
        $row.append(`
        <td>${pet.first_name} ${pet.last_name}</td>
        <td>${pet.name}</td>
        <td>${pet.breed}</td>
        <td>${pet.color}</td>
        <td><button class="edit-pet">Edit</button></td>
        <td><button class="deleteButton">Delete</button></td>
        <td><button class="check-in-out">Check In/Out</button></td>
        `);
        $('.pet-list').append($row);
    } //end for loop

} //end displayPets

function addPets() {
} // End addPets

function updatePets() {
} // End updatePets

function deletePets() {
    let id = $(this).parents('tr').data('id');
    console.log(id);
    
    $.ajax({
        method: 'DELETE',
        url: `/pets/${id}`,
        success: getPets
    })
} // End deletePets

function editPets() {
    
}
