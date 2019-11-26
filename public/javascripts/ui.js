$(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $('select').formSelect();
    $('.sidenav').sidenav({edge: 'right'});
});
//Toggle edit review form
$('.toggle-edit-form').on('click', function(){
    //toggle the edit button text on click
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    //toggle visibility of the edit review form
    $(this).siblings('.edit-review-form').toggle();
});
              
// Add click listener for clearing of rationg from edit/new form
$('.clear-rating').click(function(){
    $(this).siblings('.input-no-rate').click();
})