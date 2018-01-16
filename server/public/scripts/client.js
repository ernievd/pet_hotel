$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Get pets on load
    getPets();
    $('.pet-list').on('click', '.edit-pet', editPets);
    $('.pet-list').on('click', '.cancelButton', getPets);
    // Event Listeners

} // End readySetGo function


function getPets() {
    $.ajax({
        method: 'GET',
        url: '/pets',
        success: displayPets
    }); //end ajax get
} // End getPets

function displayPets(pets) {
    console.log('pets: ', pets);
    
    for (let i = 0; i < pets.length; i++) {
        let pet = pets[i]
        let $row = $(`<tr data-id="${pet.id}">`);
        $row.append(`
        <td>${pet.first_name} ${pet.last_name}</td>
        <td id="" class="petName">${pet.name}</td>
        <td class="petBreed">${pet.breed}</td>
        <td class ="petColor">${pet.color}</td>
        <td><button class="edit-pet">Edit</button></td>
        <td><button class="delete-pet">Delete</button></td>
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
} // End deletePets

function editPets() {
    let pet = $(this).closest('tr').data('id');
    
    $(this).parents().siblings('.petName').html(`<input type="text" value="hello">`);
    $(this).replaceWith(`
        <button class="confirmButton">Confirm</button>
        <button class ="cancelButton">Cancel</button>`);
        console.log($(this));
        
    
    // $.ajax({
    //     method: 'PUT',
    //     url: '/pets/' + pet,
    //     data: ,
    //     success: function(){
    //         getPets();
    //     }
    // });
}
