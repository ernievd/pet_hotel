$(document).ready(readySetGo);

function readySetGo() {
    console.log('readySetGo working');
    // Display pets onload
  
    // Event Listeners

} // End readySetGo function


function getPets() {
} // End getPets

function addPets() {
} // End addPets

function updatePets() {
} // End updatePets

function deletePets() {
} // End deletePets

function editPets() {

    $.ajax({
        method: 'PUT',
        url: '/pets/${}',
        data: ,
        success: function(){
            getPets();
        }
    });
}
