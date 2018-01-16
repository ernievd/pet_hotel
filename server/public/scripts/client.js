$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display pets onload
  
    // Event Listeners
    $('.deleteButton').on('click', deletePets);

} // End readySetGo function


function getPets() {
} // End getPets

function addPets() {
} // End addPets

function updatePets() {
} // End updatePets

function deletePets() {
    let id = $(this).parent().data('id');
    $.ajax({
        method: 'DELETE',
        url: `/pets/${id}`,
        success: getPets
    })
} // End deletePets

function editPets() {
    
}
